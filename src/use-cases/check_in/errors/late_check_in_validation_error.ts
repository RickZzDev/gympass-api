export class LateCheckInValidationError extends Error {
    constructor() {
        super("The CheckIn cna only be validate until 20 minutes of expiration")
    }
}