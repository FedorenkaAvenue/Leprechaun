import Translates from '../interface';

const data: Translates = {
    product: {
        amout: 'Items amount',
        foundProductAmount: '$1 product found',
        foundProductsAmount: '$1 products found',
        status: {
            available: 'Available',
            outOfStock: 'Out of stock',
        },
    },
    subscriptions: {
        notifyWhenProductIsAvailable: 'Notify when product will be available',
        emailAlreadySubscribedOnProduct: 'This email is already sibscribed on this product',
        productStatusSubscriptionsSuccess: 'We\'ll notify You when product will be available',
        productStatusSubscribed: 'You are already subscribed',
    },
    dashboard: {
        history: 'History',
    },
    cart: {
        cart: 'Cart',
        emptyCart: 'Empty cart',
        summaryProductAmount: 'Products amount',
        summaryPrice: 'Summary price',
        unvailableItems: 'Unavailable items',
    },
    order: {
        myOrders: 'My orders',
    },
    wishList: {
        wishlist: 'Wishlist',
        wishlists: 'Wishlists',
        emptyList: 'Empty list',
        myList: 'My list',
        addedToList: 'Added to',
        createNewList: 'Create new wishlist',
        makeListAsDefault: 'Make list as default wishlist',
        newListName: 'New list name',
        editWishlist: 'Edit wishlist',
        buyAllItems: 'Buy all items',
        moveItemsToAnotherList: 'Move items to another wishlist',
        sharedList: 'Shared list',
    },
    share: {
        share: 'Share',
        shareDescription: 'Anyone who has this link will be able to view this',
        linkCopied: 'Link copied to Your clipboard',
    },
    common: {
        default: 'Default',
        showMore: 'Show more',
        create: 'Create',
        cancel: 'Cancel',
        link: 'Link',
        remove: 'Delete',
        rename: 'Rename',
        edit: 'Edit',
        save: 'Save',
        change: 'Change',
        previous: 'Previous',
        next: 'Next',
        move: 'Move',
    },
    form: {
        weGotYourRequest: 'We\'ve got Your request'
    },
    errors: {
        notEmpty: 'Field souldn\'t be empty',
        textMinLength: 'Text is to small (min $1 character)',
        textMaxLength: 'Text is too large (max $1 characters)',
        invalidEmail: 'Invaild email',
    },
    sort: {
        byDate: 'By date added',
        byPriceUp: 'By price up',
        byPriceDown: 'By price down',
        byRating: 'By rating',
        byPopular: 'Most popular',
        byNewest: 'Newest',
    },
    profile: {
        personalData: 'Personal data',
        yourEmail: 'Your e-mail',
    },
    history: {
        visitedProducts: 'Visited products',
        clearHistory: 'Clear history',
        emptyProductList: 'You still don’t have any of the products you looked at',
    },
};

export default data;
