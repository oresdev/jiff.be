#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# переход в каталог сборки
cd dist

# фиксим проблемы
cp index.html 404.html

# если вы публикуете на пользовательский домен
echo 'jiff.be' > CNAME

git init
git add -A
git commit -m 'deploy'

# если вы публикуете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:gamers-gate-ru/gamers-gate-ru.github.io.git gp-pages

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
git push -f git@jiff.be.github.com:yuriygr/jiff.be.git master:gh-pages


cd -