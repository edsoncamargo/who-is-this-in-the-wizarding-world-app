# Pass-In

![Pass-In Logo](./mobile/assets/images/icon.png)

**Pass-In** is an app designed to streamline participant management at in-person events by generating unique QR code tickets for each attendee. With an intuitive interface, EventQR allows organizers to scan QR codes to efficiently register participant attendance without hassle. This project was developed as part of a hands-on session during the NLW Unite (Rocketseat).

## Credits

This project was developed based on the knowledge acquired through courses and educational materials provided by [rocketseat](https://www.rocketseat.com.br). Rockseat offers a wide range of high-quality courses and content for developers in various areas, including design, programming, and app development.

We would like to thank the Rockseat team for providing valuable educational resources that contributed to the development of this project.

For more information about the courses and materials offered by Rockseat, please visit the official website at [rocketseat](https://www.rocketseat.com.br).

🎨 [Figma do projeto](https://www.figma.com/community/file/1356738933008624188/pass-in)

## Technology

The following are the key technologies and tools used in the development of this project:

### Mobile

- **React Native**: It's a mobile app development framework that allows you to build native apps for iOS and Android using JavaScript and React. It enables mobile app development with a single codebase, providing a native user experience.
- **Expo**: It's an open-source platform and set of tools for building native mobile apps using JavaScript and React Native. Expo provides a range of ready-to-use components and APIs that streamline app development, including access to features like camera, geolocation, and push notifications.
- **Nativewind**: NativeWind uses Tailwind CSS as scripting language to create a universal style system for React Native. NativeWind components can be shared between platforms and will output their styles as CSS StyleSheet on web and StyleSheet.create for native.
- **Axios**: Is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library in a small package with a very extensible interface.
- **Zustand**: Is a minimalist state management library for React applications. It offers a simple and intuitive API for managing application state, with support for global state, local state, and derived state. Zustand emphasizes simplicity, performance, and ease of use.
- **Async Storage**: Is a library for React Native that provides a simple asynchronous storage system for persisting key-value data in the app's local storage. It offers a straightforward API for storing, retrieving, and deleting data, making it easy to manage app state across sessions. Async Storage is commonly used for caching data, storing user preferences, and implementing offline functionality in mobile applications.
- **Expo Image Picker**: Is a library that enables developers to easily add image selection functionality to their Expo projects. With this library, users can choose images from their device's gallery or take photos using the device's camera.
- **Moti**: Is a declarative animations library for React Native that allows developers to create smooth and interactive animations with ease. It provides a simple API for defining animations using JavaScript syntax, making it straightforward to add motion to your app's UI elements.
- **React Native Reanimated**: I s a powerful animation library for React Native that provides a low-level API for building complex and high-performance animations. It allows developers to create fluid and responsive animations by directly manipulating the native animation drivers on the UI thread.
- **React Native QRCode Svg**: Is a library for generating QR codes in React Native applications using SVG (Scalable Vector Graphics). It allows developers to easily create QR codes from data strings and customize their appearance using SVG properties such as color, size, and style.

### Server

- **NodeJS**: Is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Fastify**: Is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture.
- **Prisma**: Is a next-generation ORM that consists of these tools:

  - Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript
  - Prisma Migrate: Declarative data modeling & migration system
  - Prisma Studio: GUI to view and edit data in your database

- **Zod**: Is a TypeScript-first schema declaration and validation library. I'm using the term "schema" to broadly refer to any data type, from a simple string to a complex nested object.

## How It Works

### Create Ticket (QR Code):

Allows users to generate a unique QR code ticket only if no credential has been created for that email address.

### Remove Ticket (QR Code):

Enables users to remove a QR code ticket from the system while retaining the ability to access it later.

### Get Ticket (QR Code) by Code:

Allows users to retrieve a QR code ticket using its corresponding code.

## Screenshots

### Mobile

#### Play Quiz

![Play Quiz ](./mobile/assets/gifs/1.gif)

#### Explore Characters

![Create Ticket](./mobile/assets/gifs/2.gif)

#### How to Play

![Show Ticket](./mobile/assets/gifs/3.gif)

#### About

![Show Ticket](./mobile/assets/gifs/4.gif)

## Installation

To run the app locally, follow these steps:

Clone the repository:

```bash
git clone https://github.com/edsoncamargo/nlw-unite-pass-in-app
cd your-path/nlw-unite-pass-in-app
```

Next, follow the steps below:

### Mobile

1. Install the dependencies:

```bash
   cd mobile
   npm install
```

2. Start the web:

```bash
   npx expo start
```

3. Scan the QR code using the Expo Go app on your mobile device or use an emulator to test the app.

### Server

1. Install the dependencies:

```bash
   cd server
   npm install
```

2. Run the database migrations:

```
   npx prisma migrate dev
```

2. Start the server:

```bash
   npm run dev
```

## Contribution

You are welcome to contribute to the development of this project. If you find bugs, wish to add new features, or improve usability, feel free to open an issue or submit a pull request.

## Contact

- Name: Edson Camargo Menezes
- Email: contact@edsoncamargo.dev

## Acknowledgments

Special thanks to everyone who contributed to making this app a reality, especially Rocketseat for their invaluable support and guidance throughout the development process. Your expertise and dedication have been instrumental in bringing this project to fruition.

Enjoy using **Pass-In!**
