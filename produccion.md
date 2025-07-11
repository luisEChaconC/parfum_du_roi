# 🚀 Guía de Despliegue a Producción - E-commerce de Perfumes

Esta guía detalla cómo desplegar el proyecto de e-commerce de perfumes en un entorno de producción, incluyendo configuración de servidor, base de datos, seguridad y monitoreo.

## 📋 Tabla de Contenidos

1. [Arquitectura Recomendada](#arquitectura-recomendada)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Configuración del Servidor](#configuración-del-servidor)
4. [Instalación de Base de Datos](#instalación-de-base-de-datos)
5. [Configuración de la Aplicación](#configuración-de-la-aplicación)
6. [Configuración del Servidor Web](#configuración-del-servidor-web)
7. [SSL/TLS y Seguridad](#ssltls-y-seguridad)
8. [Gestión de Procesos](#gestión-de-procesos)
9. [Monitoreo y Logs](#monitoreo-y-logs)
10. [Scripts de Despliegue](#scripts-de-despliegue)
11. [Backup y Restauración](#backup-y-restauración)
12. [Solución de Problemas](#solución-de-problemas)

## 🏗️ Arquitectura Recomendada

### Configuración Mínima

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Nginx       │    │   Node.js       │    │     MySQL       │
│  (Proxy/SSL)    │───▶│   Backend       │───▶│   Database      │
│                 │    │   + Frontend    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Configuración Escalable

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Load Balancer  │    │   Web Server    │    │   Database      │
│    (Nginx)      │───▶│   (Nginx)       │    │   (MySQL)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └─────────────▶│   App Server    │◀─────────────┘
                        │   (Node.js)     │
                        └─────────────────┘
```

## 💻 Requisitos del Sistema

### Servidor Recomendado

- **SO**: Ubuntu 22.04 LTS o CentOS 8
- **CPU**: 2+ núcleos
- **RAM**: 4GB+ (8GB recomendado)
- **Almacenamiento**: 20GB+ SSD
- **Red**: 1Gbps+

### Software Requerido

- Node.js 18.x o superior
- npm 8.x o superior
- MySQL 8.0 o superior
- Nginx 1.18 o superior
- PM2 (gestor de procesos)
- Git
- Certbot (para SSL)

## 🔧 Configuración del Servidor

### 1. Actualización del Sistema

```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS/RHEL
sudo yum update -y
```

### 2. Instalación de Node.js

```bash
# Agregar repositorio oficial de Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Instalar Node.js
sudo apt install -y nodejs

# Verificar instalación
node --version
npm --version
```

### 3. Instalación de Nginx

```bash
# Ubuntu/Debian
sudo apt install -y nginx

# CentOS/RHEL
sudo yum install -y nginx

# Iniciar y habilitar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4. Instalación de PM2

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Configurar PM2 para iniciar con el sistema
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
```

## 🗄️ Instalación de Base de Datos

### 1. Instalación de MySQL

```bash
# Ubuntu/Debian
sudo apt install -y mysql-server

# CentOS/RHEL
sudo yum install -y mysql-server

# Iniciar y habilitar MySQL
sudo systemctl start mysql
sudo systemctl enable mysql
```

### 2. Configuración Inicial de MySQL

```bash
# Ejecutar script de seguridad
sudo mysql_secure_installation

# Configurar MySQL para producción
sudo mysql -u root -p
```

### 3. Configuración de Base de Datos

```sql
-- Crear usuario para la aplicación
CREATE USER 'perfume_user'@'localhost' IDENTIFIED BY 'tu_contraseña_segura';

-- Crear base de datos
CREATE DATABASE perfume_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Otorgar permisos
GRANT ALL PRIVILEGES ON perfume_store.* TO 'perfume_user'@'localhost';
FLUSH PRIVILEGES;

-- Salir de MySQL
EXIT;
```

### 4. Configuración de MySQL para Producción

```bash
# Editar configuración de MySQL
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

```ini
# Configuración para producción
[mysqld]
# Configuraciones de rendimiento
innodb_buffer_pool_size = 2G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 2
query_cache_size = 64M
query_cache_limit = 2M

# Configuraciones de seguridad
bind-address = 127.0.0.1
skip-name-resolve
```

```bash
# Reiniciar MySQL
sudo systemctl restart mysql
```

## 🔐 Configuración de la Aplicación

### 1. Clonación del Repositorio

```bash
# Crear directorio para la aplicación
sudo mkdir -p /var/www/perfume-store
sudo chown -R $USER:$USER /var/www/perfume-store

# Clonar repositorio
cd /var/www/perfume-store
git clone https://github.com/tu-usuario/proyecto_desarrollo_web.git .
```

### 2. Configuración del Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm ci --only=production

# Crear archivo de variables de entorno
nano .env
```

```env
# Variables de entorno para producción
NODE_ENV=production
PORT=3000

# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=perfume_user
DB_PASSWORD=tu_contraseña_segura
DB_NAME=perfume_store

# Seguridad
SESSION_SECRET=tu_secret_key_muy_segura_de_al_menos_32_caracteres
CORS_ORIGIN=https://tu-dominio.com

# Configuraciones adicionales
MAX_FILE_SIZE=5242880
UPLOAD_PATH=/var/www/perfume-store/uploads
```

```bash
# Compilar la aplicación
npm run build

# Ejecutar migraciones (si las hay)
npm run migration:run

# Poblar base de datos inicial
npm run seed
```

### 3. Configuración del Frontend

```bash
# Navegar al directorio frontend
cd ../frontend

# Instalar dependencias
npm ci --only=production

# Crear archivo de variables de entorno
nano .env
```

```env
# Variables de entorno para producción
VITE_API_URL=https://tu-dominio.com/api
VITE_APP_NAME=Perfume Store
VITE_APP_VERSION=1.0.0
```

```bash
# Compilar para producción
npm run build
```

## 🌐 Configuración del Servidor Web

### 1. Configuración de Nginx

```bash
# Crear configuración del sitio
sudo nano /etc/nginx/sites-available/perfume-store
```

```nginx
# /etc/nginx/sites-available/perfume-store
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    # Redireccionar HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tu-dominio.com www.tu-dominio.com;

    # Configuración SSL
    ssl_certificate /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Configuración de seguridad
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Configuración de archivos estáticos
    root /var/www/perfume-store/frontend/dist;
    index index.html;

    # Configuración de gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/json
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Configuración de caché para archivos estáticos
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Proxy para API del backend
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Configuración para Single Page Application
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Configuración de logs
    access_log /var/log/nginx/perfume-store.access.log;
    error_log /var/log/nginx/perfume-store.error.log;
}
```

```bash
# Habilitar el sitio
sudo ln -s /etc/nginx/sites-available/perfume-store /etc/nginx/sites-enabled/

# Deshabilitar sitio por defecto
sudo rm /etc/nginx/sites-enabled/default

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

## 🔒 SSL/TLS y Seguridad

### 1. Instalación de Certbot

```bash
# Ubuntu/Debian
sudo apt install -y certbot python3-certbot-nginx

# CentOS/RHEL
sudo yum install -y certbot python3-certbot-nginx
```

### 2. Obtener Certificado SSL

```bash
# Obtener certificado SSL
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Verificar renovación automática
sudo certbot renew --dry-run
```

### 3. Configuración de Firewall

```bash
# Ubuntu (UFW)
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 3306/tcp

# CentOS (firewalld)
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-port=3306/tcp
sudo firewall-cmd --reload
```

### 4. Configuración de Seguridad Adicional

```bash
# Crear script de seguridad
sudo nano /etc/security/limits.conf
```

```conf
# Límites de recursos
* soft nofile 65536
* hard nofile 65536
* soft nproc 65536
* hard nproc 65536
```

## 🔄 Gestión de Procesos

### 1. Configuración de PM2

```bash
# Crear configuración de PM2
nano /var/www/perfume-store/ecosystem.config.js
```

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "perfume-backend",
      script: "dist/main.js",
      cwd: "/var/www/perfume-store/backend",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "/var/log/pm2/perfume-backend-error.log",
      out_file: "/var/log/pm2/perfume-backend-out.log",
      log_file: "/var/log/pm2/perfume-backend.log",
      time: true,
      max_memory_restart: "1G",
      node_args: "--max-old-space-size=1024",
    },
  ],
};
```

```bash
# Crear directorios de logs
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2

# Iniciar aplicación con PM2
pm2 start ecosystem.config.js --env production

# Guardar configuración de PM2
pm2 save

# Verificar estado
pm2 status
pm2 logs
```

## 📊 Monitoreo y Logs

### 1. Configuración de Logrotate

```bash
# Crear configuración de logrotate
sudo nano /etc/logrotate.d/perfume-store
```

```conf
# /etc/logrotate.d/perfume-store
/var/log/nginx/perfume-store.*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        if [ -f /var/run/nginx.pid ]; then
            kill -USR1 `cat /var/run/nginx.pid`
        fi
    endscript
}

/var/log/pm2/perfume-backend*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 $USER $USER
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 2. Script de Monitoreo

```bash
# Crear script de monitoreo
nano /var/www/perfume-store/scripts/monitor.sh
```

```bash
#!/bin/bash
# /var/www/perfume-store/scripts/monitor.sh

# Configuración
LOG_FILE="/var/log/perfume-store-monitor.log"
BACKEND_URL="http://localhost:3000/api/health"
FRONTEND_URL="https://tu-dominio.com"

# Función de logging
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOG_FILE
}

# Verificar backend
check_backend() {
    if curl -f -s $BACKEND_URL > /dev/null; then
        log_message "Backend: OK"
        return 0
    else
        log_message "Backend: ERROR - Reiniciando..."
        pm2 restart perfume-backend
        return 1
    fi
}

# Verificar frontend
check_frontend() {
    if curl -f -s $FRONTEND_URL > /dev/null; then
        log_message "Frontend: OK"
        return 0
    else
        log_message "Frontend: ERROR"
        return 1
    fi
}

# Verificar base de datos
check_database() {
    if mysql -u perfume_user -p'tu_contraseña_segura' -e "USE perfume_store; SELECT 1;" > /dev/null 2>&1; then
        log_message "Database: OK"
        return 0
    else
        log_message "Database: ERROR"
        return 1
    fi
}

# Verificar espacio en disco
check_disk_space() {
    USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
    if [ $USAGE -gt 85 ]; then
        log_message "Disk Space: WARNING - $USAGE% used"
    else
        log_message "Disk Space: OK - $USAGE% used"
    fi
}

# Ejecutar verificaciones
check_backend
check_frontend
check_database
check_disk_space
```

```bash
# Hacer ejecutable
chmod +x /var/www/perfume-store/scripts/monitor.sh

# Agregar a crontab
crontab -e
```

```cron
# Ejecutar monitoreo cada 5 minutos
*/5 * * * * /var/www/perfume-store/scripts/monitor.sh
```

## 📜 Scripts de Despliegue

### 1. Script de Despliegue Automático

```bash
# Crear script de despliegue
nano /var/www/perfume-store/scripts/deploy.sh
```

```bash
#!/bin/bash
# /var/www/perfume-store/scripts/deploy.sh

set -e

# Configuración
APP_DIR="/var/www/perfume-store"
BACKUP_DIR="/var/backups/perfume-store"
DATE=$(date +"%Y%m%d_%H%M%S")

# Función de logging
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Crear backup
create_backup() {
    log "Creando backup..."
    mkdir -p $BACKUP_DIR
    tar -czf $BACKUP_DIR/backup_$DATE.tar.gz -C $APP_DIR .
    log "Backup creado: $BACKUP_DIR/backup_$DATE.tar.gz"
}

# Actualizar código
update_code() {
    log "Actualizando código..."
    cd $APP_DIR
    git fetch origin
    git checkout main
    git pull origin main
}

# Instalar dependencias y compilar
build_application() {
    log "Construyendo backend..."
    cd $APP_DIR/backend
    npm ci --only=production
    npm run build

    log "Construyendo frontend..."
    cd $APP_DIR/frontend
    npm ci --only=production
    npm run build
}

# Ejecutar migraciones
run_migrations() {
    log "Ejecutando migraciones..."
    cd $APP_DIR/backend
    npm run migration:run
}

# Reiniciar servicios
restart_services() {
    log "Reiniciando servicios..."
    pm2 restart perfume-backend
    sudo systemctl reload nginx
}

# Verificar despliegue
verify_deployment() {
    log "Verificando despliegue..."
    sleep 5

    if curl -f -s http://localhost:3000/api/health > /dev/null; then
        log "Backend: OK"
    else
        log "Backend: ERROR"
        return 1
    fi

    if curl -f -s https://tu-dominio.com > /dev/null; then
        log "Frontend: OK"
    else
        log "Frontend: ERROR"
        return 1
    fi

    log "Despliegue completado exitosamente"
}

# Ejecutar despliegue
main() {
    log "Iniciando despliegue..."

    create_backup
    update_code
    build_application
    run_migrations
    restart_services
    verify_deployment

    log "Despliegue completado"
}

# Ejecutar función principal
main "$@"
```

```bash
# Hacer ejecutable
chmod +x /var/www/perfume-store/scripts/deploy.sh
```

### 2. Script de Rollback

```bash
# Crear script de rollback
nano /var/www/perfume-store/scripts/rollback.sh
```

```bash
#!/bin/bash
# /var/www/perfume-store/scripts/rollback.sh

set -e

# Configuración
APP_DIR="/var/www/perfume-store"
BACKUP_DIR="/var/backups/perfume-store"

# Función de logging
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Listar backups disponibles
list_backups() {
    log "Backups disponibles:"
    ls -la $BACKUP_DIR/backup_*.tar.gz | awk '{print $9, $5, $6, $7, $8}'
}

# Restaurar backup
restore_backup() {
    if [ -z "$1" ]; then
        log "Error: Debe especificar el archivo de backup"
        list_backups
        exit 1
    fi

    BACKUP_FILE="$1"

    if [ ! -f "$BACKUP_FILE" ]; then
        log "Error: Archivo de backup no encontrado: $BACKUP_FILE"
        exit 1
    fi

    log "Restaurando backup: $BACKUP_FILE"

    # Detener servicios
    pm2 stop perfume-backend

    # Crear backup actual antes de restaurar
    DATE=$(date +"%Y%m%d_%H%M%S")
    tar -czf $BACKUP_DIR/pre_rollback_$DATE.tar.gz -C $APP_DIR .

    # Restaurar backup
    cd $APP_DIR
    tar -xzf $BACKUP_FILE

    # Reiniciar servicios
    pm2 start perfume-backend
    sudo systemctl reload nginx

    log "Rollback completado"
}

# Ejecutar rollback
if [ "$1" = "list" ]; then
    list_backups
else
    restore_backup "$1"
fi
```

```bash
# Hacer ejecutable
chmod +x /var/www/perfume-store/scripts/rollback.sh
```

## 💾 Backup y Restauración

### 1. Script de Backup de Base de Datos

```bash
# Crear script de backup de BD
nano /var/www/perfume-store/scripts/backup-db.sh
```

```bash
#!/bin/bash
# /var/www/perfume-store/scripts/backup-db.sh

# Configuración
DB_USER="perfume_user"
DB_PASS="tu_contraseña_segura"
DB_NAME="perfume_store"
BACKUP_DIR="/var/backups/mysql"
DATE=$(date +"%Y%m%d_%H%M%S")

# Crear directorio de backup
mkdir -p $BACKUP_DIR

# Crear backup
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/perfume_store_$DATE.sql

# Comprimir backup
gzip $BACKUP_DIR/perfume_store_$DATE.sql

# Eliminar backups antiguos (más de 30 días)
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "Backup completado: $BACKUP_DIR/perfume_store_$DATE.sql.gz"
```

```bash
# Hacer ejecutable
chmod +x /var/www/perfume-store/scripts/backup-db.sh

# Agregar a crontab para backup diario
crontab -e
```

```cron
# Backup diario de base de datos a las 2:00 AM
0 2 * * * /var/www/perfume-store/scripts/backup-db.sh
```

### 2. Script de Restauración de Base de Datos

```bash
# Crear script de restauración
nano /var/www/perfume-store/scripts/restore-db.sh
```

```bash
#!/bin/bash
# /var/www/perfume-store/scripts/restore-db.sh

# Configuración
DB_USER="perfume_user"
DB_PASS="tu_contraseña_segura"
DB_NAME="perfume_store"

if [ -z "$1" ]; then
    echo "Uso: $0 <archivo_backup.sql.gz>"
    echo "Backups disponibles:"
    ls -la /var/backups/mysql/perfume_store_*.sql.gz
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Error: Archivo no encontrado: $BACKUP_FILE"
    exit 1
fi

# Confirmar restauración
read -p "¿Estás seguro de que quieres restaurar la base de datos? (y/N): " -r
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Restauración cancelada"
    exit 1
fi

# Descomprimir y restaurar
gunzip -c $BACKUP_FILE | mysql -u $DB_USER -p$DB_PASS $DB_NAME

echo "Restauración completada desde: $BACKUP_FILE"
```

```bash
# Hacer ejecutable
chmod +x /var/www/perfume-store/scripts/restore-db.sh
```

## 🔧 Archivos de Configuración Adicionales

### 1. Configuración de Sistema para Node.js

```bash
# Crear archivo de configuración del sistema
sudo nano /etc/systemd/system/perfume-backend.service
```

```ini
[Unit]
Description=Perfume Store Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/perfume-store/backend
ExecStart=/usr/bin/node dist/main.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

### 2. Configuración de Nginx para Múltiples Dominios

```bash
# Crear configuración para múltiples dominios
sudo nano /etc/nginx/sites-available/perfume-store-multi
```

```nginx
# Configuración para múltiples dominios
server {
    listen 80;
    server_name perfume-store.com www.perfume-store.com tienda-perfumes.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name perfume-store.com www.perfume-store.com tienda-perfumes.com;

    # Configuración SSL
    ssl_certificate /etc/letsencrypt/live/perfume-store.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/perfume-store.com/privkey.pem;

    # Incluir configuración base
    include /etc/nginx/snippets/ssl-params.conf;
    include /etc/nginx/snippets/perfume-store-common.conf;
}
```

### 3. Configuración de Parámetros SSL

```bash
# Crear snippet para configuración SSL
sudo nano /etc/nginx/snippets/ssl-params.conf
```

```nginx
# /etc/nginx/snippets/ssl-params.conf
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
ssl_session_tickets off;
ssl_stapling on;
ssl_stapling_verify on;

# Configuraciones de seguridad
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Frame-Options DENY always;
add_header X-Content-Type-Options nosniff always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self'; object-src 'none'; child-src 'none'; worker-src 'none'; frame-ancestors 'none'; form-action 'self'; base-uri 'self';" always;
```

## 🚨 Solución de Problemas

### Problemas Comunes y Soluciones

#### 1. Error de Conexión a Base de Datos

```bash
# Verificar estado de MySQL
sudo systemctl status mysql

# Verificar conexión
mysql -u perfume_user -p -h localhost perfume_store

# Verificar logs
sudo tail -f /var/log/mysql/error.log
```

#### 2. Error 502 Bad Gateway

```bash
# Verificar estado de PM2
pm2 status

# Verificar logs del backend
pm2 logs perfume-backend

# Verificar configuración de Nginx
sudo nginx -t

# Verificar logs de Nginx
sudo tail -f /var/log/nginx/error.log
```

#### 3. Problemas de SSL

```bash
# Verificar certificados
sudo certbot certificates

# Renovar certificados
sudo certbot renew

# Verificar configuración SSL
openssl s_client -connect tu-dominio.com:443 -servername tu-dominio.com
```

#### 4. Alto Uso de CPU/Memoria

```bash
# Verificar procesos
top -p $(pgrep -d, node)

# Verificar uso de memoria de PM2
pm2 monit

# Reiniciar aplicación
pm2 restart perfume-backend
```

### Scripts de Diagnóstico

```bash
# Crear script de diagnóstico
nano /var/www/perfume-store/scripts/diagnose.sh
```

```bash
#!/bin/bash
# /var/www/perfume-store/scripts/diagnose.sh

echo "=== Diagnóstico del Sistema ==="
echo "Fecha: $(date)"
echo

echo "=== Estado de Servicios ==="
systemctl is-active nginx
systemctl is-active mysql
pm2 status

echo
echo "=== Uso de Recursos ==="
free -h
df -h
uptime

echo
echo "=== Logs Recientes ==="
echo "--- Nginx ---"
sudo tail -n 5 /var/log/nginx/error.log

echo "--- PM2 ---"
pm2 logs --lines 5

echo "--- MySQL ---"
sudo tail -n 5 /var/log/mysql/error.log
```

## 📋 Checklist de Despliegue

### Pre-Despliegue

- [ ] Servidor configurado con requisitos mínimos
- [ ] Dominio configurado y DNS apuntando al servidor
- [ ] Certificados SSL obtenidos
- [ ] Base de datos configurada
- [ ] Variables de entorno configuradas
- [ ] Firewall configurado

### Despliegue

- [ ] Código actualizado desde repositorio
- [ ] Dependencias instaladas
- [ ] Aplicaciones compiladas
- [ ] Migraciones ejecutadas
- [ ] Servicios iniciados
- [ ] Nginx configurado

### Post-Despliegue

- [ ] Aplicación accesible desde el dominio
- [ ] API respondiendo correctamente
- [ ] SSL funcionando
- [ ] Monitoreo configurado
- [ ] Backups programados
- [ ] Logs rotando correctamente

## 🔄 Mantenimiento Continuo

### Tareas Diarias

- Revisar logs de errores
- Verificar estado de servicios
- Monitorear uso de recursos

### Tareas Semanales

- Actualizar paquetes del sistema
- Revisar backups
- Verificar certificados SSL

### Tareas Mensuales

- Actualizar dependencias de Node.js
- Limpiar logs antiguos
- Revisar configuraciones de seguridad

---

## 👥 Contacto y Soporte

Para soporte técnico o consultas sobre el despliegue:

- **Kenneth Osorio Masis** - C15724
- **Antony Picado Alvarado** - C15939
- **Esteban Chacón Chaves** - C22039
- **Ignacio Alesina Acuña** - C5A073

---

⚠️ **Nota**: Esta guía asume un entorno de producción básico. Para implementaciones de gran escala, considere usar contenedores (Docker), orquestación (Kubernetes), balanceadores de carga dedicados, y sistemas de monitoreo más avanzados.
