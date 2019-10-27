export function status(value) {

    value = parseInt(value);

    if(value === 0){
        return "Awaiting Confirmation"
    }else if(value === 1){
        return "Unconfirmed"
    }else if(value === 2){
        return "Awaiting Delivery"
    }else if(value === 3) {
        return "Completed"
    }

}