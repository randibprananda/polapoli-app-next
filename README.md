# FE Pola Poli
Frontend Pola Poli

# Daftar Isi
* [Prakata](#prakata)
* [Teknologi](#teknologi)
* [Cara Menjalankan](#cara-menjalankan)
* [Struktur Folder](#struktur-folder)

# Prakata
Projek ini merupakan bagian frontend dari projek PolaPoli yang memiliki 2 halaman yaitu Admin Panel dan Landing Page dan sistem ini membutuhkan API dari repository [Pola Poli BE](https://gitlab.com/themadjou/pola-poli-be.git)

# Teknologi
* [TypeScript](https://www.typescriptlang.org/)
* [ReactJS](https://reactjs.org/)
* [NextJS](https://nextjs.org/)
* [Sass](https://sass-lang.com/)
* [TailwindCSS](https://tailwindcss.com/)
* [Ant Design](https://ant.design/)
* [SWR](https://swr.vercel.app/)


# Cara Menjalankan
Berikut ini hal-hal yang perlu dilakukan agar project ini dapat dijalankan.

## Prerequisites
Agar proses persiapan sampai menjalankan project dapat berjalan lancar, berikut ini yang harus diinstall lebih dahulu.
| Sistem Lain | Kegunaan |
|-|-|
| [Git](http://git-scm.com) | manajemen versi |
| [NodeJS](https://nodejs.org/en) | sebagai mesin yang menjalankan project |
| [NPM](https://www.npmjs.com) atau [Yarn](https://yarnpkg.com) | memanajemen modul dalam project |

## Persiapan
Sebelum project dapat dijalankan, ada beberapa hal yang perlu dipersiapkan.
Berikut ini langkah-langkah untuk mempersiapkan project.

1. Clone repository ini dengan menjalankan perintah berikut di terminal emulator.
```sh
git clone https://gitlab.com/themadjou/pola-poli-fe.git
```
2. Masuk ke direktory project dengan menjalankan perintah berikut ini.
```sh
cd ./pola-poli-fe
```
3. Install modul-modul yang dibutuhkan project dengan menjalankan perintah berikut ini.
```sh
# dengan npm
npm install
```

> Apabila menggunakan yarn, maka perintah yang digunakan adalah berikut ini.
> ```sh
> yarn
> ```

4. Buat file bernama `.env` dan isi dengan konfigurasi yang diinginkan.
> Contoh isi file `.env` ini dapat di lihat di file [env.example.](./.example.env.local)

## Menjalankan Project
Setelah project siap, selanjutnya dapat dijalankan dengan menggunakan perintah berikut ini.
```sh
npm run dev
```

> Apabila menggunakan yarn, maka perintah yang digunakan adalah berikut ini.
> ```sh
> yarn dev
> ```


# Struktur Folder
```
pola-poli-fe/
|
|- .husky
|- public
|- src/
|   |- @types
|   |- assets 
|   |- components/ --> atomic design
|   |   |-atoms
|   |   |-moleculs
|   |   |-organisms
|   |   |-index.ts
|   |
|   |- config
|   |- constant
|   |- context
|   |- customHooks
|   |- layouts
|   |- pages
|   |- routes
|   |- styles/  --> sass folder
|   |   |-base
|   |   |-components
|   |   |-sass-utils
|   |   |-vendors
|   |   |-style.scss
|   |
|   |- swr
|   |- theme
|   |- utils
|
|- .example.env.local // example environment variables
|- .eslintrc.json
|- .prettierignore
|- .prettierrc.js
| ...
|- next.config.js
|- postcss.config.js
|- tailwind.condig.js
|- server.js
| ...
```