#!/bin/bash
# install_postgresql_linux.sh
# Требует прав суперпользователя

# Для Debian/Ubuntu
if [ -f /etc/debian_version ]; then
    # Добавление репозитория
    sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
    
    # Обновление пакетов
    sudo apt-get update
    
    # Установка PostgreSQL и зависимостей
    sudo apt-get install -y postgresql postgresql-contrib

# Для RHEL/CentOS
elif [ -f /etc/redhat-release ]; then
    # Установка репозитория
    sudo dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-9-x86_64/pgdg-redhat-repo-latest.noarch.rpm
    
    # Отключение встроенного модуля
    sudo dnf -qy module disable postgresql
    
    # Установка PostgreSQL
    sudo dnf install -y postgresql16-server postgresql16-contrib
    
    # Инициализация БД
    sudo /usr/pgsql-16/bin/postgresql-16-setup initdb
    sudo systemctl enable postgresql-16
    sudo systemctl start postgresql-16

else
    echo "Дистрибутив не поддерживается"
    exit 1
fi

# Проверка установки
if which psql >/dev/null; then
    echo "PostgreSQL успешно установлен"
    echo "Версия: $(psql --version)"
else
    echo "Ошибка установки PostgreSQL"
    exit 1
fi

# Настройка пароля для postgres
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'admin';"  # Замените пароль