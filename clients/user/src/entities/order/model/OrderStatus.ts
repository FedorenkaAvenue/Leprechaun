export enum OrderStatusModel {
    INIT = 1, // корзина
    POSTED = 2, // подтвержден пользователем
    IN_PROCESS = 3, // подтвержден продавец
    COMPLETED = 4, // завершен
    CANCELED = 5, // отменен
}
