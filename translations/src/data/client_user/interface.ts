type Translates = {
    product: {
        amout: string
        foundProductAmount: string
        foundProductsAmount: string
        status: {
            available: string
            outOfStock: string
        }
    }
    subscriptions: {
        notifyWhenProductIsAvailable: string
        emailAlreadySubscribedOnProduct: string
        productStatusSubscriptionsSuccess: string
    }
    dashboard: {
        history: string
    }
    cart: {
        cart: string
        emptyCart: string
        summaryProductAmount: string
        summaryPrice: string
        unvailableItems: string
    }
    order: {
        myOrders: string
    }
    wishList: {
        wishlist: string
        wishlists: string
        emptyList: string
        myList: string
        addedToList: string
        createNewList: string
        makeListAsDefault: string
        newListName: string
        editWishlist: string
        buyAllItems: string
        moveItemsToAnotherList: string
        sharedList: string
    }
    share: {
        share: string
        shareDescription: string
        linkCopied: string
    }
    common: {
        default: string
        showMore: string
        create: string
        cancel: string
        link: string
        remove: string
        rename: string
        edit: string
        save: string
        change: string
        previous: string
        next: string
        move: string
    }
    form: {
        weGotYourRequest: string
    }
    errors: {
        notEmpty: string
        textMinLength: string
        textMaxLength: string
        invalidEmail: string
    }
    sort: {
        byDate: string
        byPriceUp: string
        byPriceDown: string
        byRating: string
        byPopular: string
        byNewest: string
    }
    profile: {
        personalData: string
        yourEmail: string
    }
    history: {
        visitedProducts: string
        clearHistory: string
        emptyProductList: string
    }
}

export default Translates;
