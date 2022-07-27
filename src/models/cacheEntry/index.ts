export type TCacheEntry = {
    rateLimit:number,
    requestQueue:Date[],
}

export type TCacheReadFrom = {
    '.rateLimit':number,
    '.requestQueue':Date[]
}