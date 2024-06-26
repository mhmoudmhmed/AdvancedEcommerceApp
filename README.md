# Advanced E-commerce Mobile Application

This is a small e-commerce mobile application built with React Native, TypeScript, and Redux. It includes functionalities such as product listing, product details, shopping cart, user authentication, and a mocked secure payment integration.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Mock API](#mock-api)
- [Demo Video](#demo-video)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Product Listing**:

   - Fetch a list of products from a mock API.
   - Display the products in a scrollable grid or list.
   - Each product displays an image, name, price, and a short description.

2. **Product Details**:

   - Navigate to the product details screen when a product is clicked.
   - Display detailed information about the product including images, name, full description, price, and reviews.

3. **Shopping Cart**:

   - Allow users to add products to the shopping cart.
   - View the shopping cart with a list of added products, total price, and the ability to remove items.
   - Persist the cart state across app restarts.

4. **User Authentication**:

   - Implement user authentication with a mocked backend (sign up, login, logout).
   - Use secure token storage for authentication tokens.
   - Protect certain routes (like the shopping cart) behind authentication.

5. **Secure Payment Integration (Mocked)**:
   - Integrate a mocked payment flow.
   - Secure sensitive data, e.g., by using encryption.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **React Native CLI**: Install the React Native CLI globally by running `npm install -g react-native-cli`.
- **Watchman**: Install Watchman, which is used by React Native for detecting file changes. You can download it from [facebook.github.io/watchman](https://facebook.github.io/watchman/docs/install.html).
- **Xcode** (for iOS development): Install Xcode from the Mac App Store if you are developing for iOS.
- **Android Studio** (for Android development): Install Android Studio from [developer.android.com/studio](https://developer.android.com/studio).

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mhmoudmhmed/AdvancedEcommerceApp.git
   cd AdvancedEcommerceApp

   ```

2. **Run the application with Android**:

   ```bash
   npm install
   react-native run-android

   ```

3. **Run the application with IOS**:
   ```bash
   sudo gem install cocoapods
   cd ios
   npm start
   react-native run-ios
   ```

## Demo Video
https://github.com/mhmoudmhmed/AdvancedEcommerceApp/assets/43688208/54cd89ad-0492-44f4-b827-d529625b9742

## Contributing

Contributions are welcome! Please read the contributing guidelines to get started.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
