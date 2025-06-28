# 🚀 Local Experts Platform

A Laravel 11+ web application running inside Docker, with Nginx, Swagger UI, and PHP-FPM — prewired for development and API documentation.

---

## 📦 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) & Docker Compose installed  
- Linux/macOS/WSL2 terminal  
- Git (optional)

---

## 🧰 Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd local_experts
```

---

### 2. 🐋 Build and Start Containers

```bash
docker compose up -d --build
```

- App: [http://localhost:8000](http://localhost:8000)  
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 3. 🎯 Create Laravel Project (if not yet installed)

```bash
docker compose exec app composer create-project laravel/laravel .
```

---

### 4. 🔧 Set File Permissions (Linux/macOS only)

```bash
sudo chown -R $USER:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

---

### 5. 🧠 Run Laravel Commands

```bash
docker compose exec app php artisan migrate
docker compose exec app php artisan test
docker compose exec app composer install
```

---

### 6. 📘 Swagger UI

- Add your OpenAPI file to `./docs/openapi.json` or `openapi.yaml`.
- Then visit [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 7. 🖧 Host Nginx Reverse Proxy (Optional)

#### Step 1: Create Nginx Config

Create `/etc/nginx/sites-available/local_experts.conf`:

```nginx
server {
    listen 80;
    server_name local.experts.test;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /docs/ {
        proxy_pass http://127.0.0.1:8081/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Step 2: Enable and Reload Nginx

```bash
sudo ln -s /etc/nginx/sites-available/local_experts.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 3: Update `/etc/hosts`

```bash
echo "127.0.0.1 local.experts.test" | sudo tee -a /etc/hosts
```

---

### 8. 🛑 Stop & Clean Containers

**Stop all containers**:

```bash
docker compose down
```

**Remove all containers**:

```bash
docker rm -f $(docker ps -aq)
```

**Remove all images**:

```bash
docker rmi -f $(docker images -aq)
```

**Remove volumes (optional):**

```bash
docker volume prune -f
```

---

### 9. 🧼 Dockerized Nginx Routing

**Port Bindings Overview:**

| Service               | Docker Port | Host Access            |
|------------------------|-------------|-------------------------|
| App (Laravel + PHP-FPM) | 9000        | Internal only           |
| Nginx (Reverse Proxy)  | 80          | http://localhost:8000   |
| Swagger UI             | 8080        | http://localhost:8081   |

#### Example Nginx `default.conf` inside the container:

```nginx
server {
    listen 80;
    root /var/www/public;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location /docs/ {
        proxy_pass http://swagger:8080/;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass app:9000;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

10. ⚛️ Create React Frontend with Vite and Inertia.js
mkdir react-frontend
cd react-frontend
docker run --rm -v $(pwd):/usr/src/app -w /usr/src/app node:20 npm create vite@latest . -- --template react
docker run --rm -v $(pwd):/usr/src/app -w /usr/src/app node:20 npm install
docker compose run --rm react npm install @inertiajs/inertia @inertiajs/inertia-react
docker compose run --rm react npm install -D tailwindcss postcss autoprefixer
docker compose run --rm react npm exec tailwindcss init -p


---

## 🤝 License

MIT

---

This `README.md` serves as a complete reference for local setup and development.  
Want a `.env.example`, shell script setup, or GitHub badge? Let me know — happy to help!


