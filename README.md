# BubbleBrew 🧋

## Overview

BubbleBrew is a web application that allows users to customize and order their favorite bubble tea. The application is built using React for the frontend and FastAPI for the backend, with PostgreSQL as the database.

## Features

- **User Authentication**: Users can sign up, log in, and log out using their email and password.
- **Customize Bubble Tea**: Users can select flavours, toppings, and size for their bubble tea.
- **Cart Management**: Users can add customized bubble tea to their cart.
- **Order Processing**: Users can view their orders and checkout.

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: FastAPI
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS

## Installation

### Prerequisites

- Node.js
- Python 3.8+
- PostgreSQL

### Frontend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/sora-san45/bubblebrew.git
    cd bubblebrew/client
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the development server:
    ```sh
    npm start
    ```

### Backend Setup

1. Navigate to the backend directory:
    ```sh
    cd bubblebrew/backend
    ```

2. Create and activate a virtual environment:
    ```sh
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    ```

3. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Set up the PostgreSQL database and update the database URL in the `config.py` file.

5. Run the FastAPI server:
    ```sh
    uvicorn main:app --reload
    ```

## Usage

### User Authentication

- **Sign Up**: Users can create a new account.
- **Log In**: Users can log in with their email and password.
- **Log Out**: Users can log out of their account.

### Customizing Bubble Tea

1. **Select Flavour**: Choose from a variety of flavours.
2. **Choose Toppings**: Add your favorite toppings.
3. **Select Size**: Choose the size of your bubble tea.
4. **Add to Cart**: Add the customized bubble tea to your cart.

### Cart Management

- **View Cart**: See all the items in your cart.
- **Delete Item**: Delete items from your cart
- **Proceed to Checkout**: Complete your order.

### Order Processing

- **View Orders**: See a list of your past orders.


