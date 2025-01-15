#  Указываем базовый образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

#  Копируем файлы package.json и package-lock.json
COPY package*.json ./

#  Устанавливаем зависимости
RUN npm install

#  Копируем весь код проекта
COPY . .

#  Сборка приложения для продакшена
RUN npm run build

#  Указываем порт
EXPOSE 3030

# Запускаем приложение
CMD ["npm", "run", "start:prod"]