export const isRider = (jobs) => {
    let res = false
    jobs.forEach((e) => {
        if (e.myOrder) {
            res = true
        }
    })
    return res
}
