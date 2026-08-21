# Déploiement VPS & Workflow CI/CD — Grimoire Tactics

Document vivant spécifiant l'infrastructure de déploiement sur le VPS `maxnumerique@vps-48388654`.

---

## 1. Emplacement & Ports sur le VPS

| Élément | Valeur sur le VPS |
|---|---|
| **Utilisateur SSH** | `maxnumerique` |
| **Dossier d'application** | `/home/maxnumerique/apps/grimoire_tactics` |
| **Port Hôte Application** | `3001` (redirigé vers le port interne `3000` du conteneur) |
| **Port Hôte PostgreSQL** | `5432` |

---

## 2. Configuration Initiale sur le VPS (À faire 1 seule fois)

### 2.1 Créer le dossier de l'application
```bash
mkdir -p /home/maxnumerique/apps/grimoire_tactics
```

### 2.2 Y placer le fichier `docker-compose.yml`
```bash
cat << 'EOF' > /home/maxnumerique/apps/grimoire_tactics/docker-compose.yml
services:
  app:
    image: ghcr.io/maxnumerique/grimoire_tactics:latest
    container_name: grimoire_tactics_app
    restart: always
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=postgresql://grimoire_user:grimoire_password@postgres:5432/grimoire_db?schema=public
      - NODE_ENV=production
    depends_on:
      - postgres

  postgres:
    image: postgres:16-alpine
    container_name: grimoire_tactics_db
    restart: always
    environment:
      - POSTGRES_USER=grimoire_user
      - POSTGRES_PASSWORD=CHANGER_MOT_DE_PASSE_ICI
      - POSTGRES_DB=grimoire_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
EOF
```

### 2.3 Configuration du Reverse Proxy Nginx (Sous-Domaine)
Créez la configuration Nginx pour rediriger le sous-domaine vers le port `3001` :

```nginx
server {
    server_name grimoire.votre-domaine.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activez le site et sécurisez avec Certbot :
```bash
sudo ln -s /etc/nginx/sites-available/grimoire_tactics /etc/nginx/sites-enabled/
sudo systemctl reload nginx
sudo certbot --nginx -d grimoire.votre-domaine.com
```

---

## 3. Secrets GitHub Actions à Configurer

Dans le dépôt GitHub (`Settings > Secrets and variables > Actions`) :
- `VPS_HOST` : L'adresse IP ou le nom de domaine de votre VPS.
- `VPS_USER` : `maxnumerique`
- `VPS_SSH_KEY` : La clé SSH privée autorisée pour `maxnumerique`.

---

## 4. Commandes Utiles sur le VPS

```bash
cd /home/maxnumerique/apps/grimoire_tactics

# Voir les logs de l'application en temps réel
docker compose logs -f app

# Redémarrer l'application
docker compose restart app

# Mise à jour manuelle
docker compose pull
docker compose up -d --force-recreate
docker image prune -f
```
