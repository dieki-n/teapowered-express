//(c) Victor Noordhoek

/**
 * Implements a queue which will advance every specified number of milliseconds.
 */
class TimedQueue{
    timer = undefined;
    queue = [];
    last_process = 0;
    interval;

    /**
     * @param {Integer} interval - Queue interval in milliseconds.
     */
    constructor(interval){
        this.interval = interval;       
    }

    /**
     * @param {method} func - Function to add to the queue.
     * @returns Promise which will be resolved with the results of the function.
     */
    add(func){
        let p = new Promise((resolve, reject) => {
            this.queue.push({resolve, reject, func});
        });
        if (this.timer === undefined) this.start();
        return p;
    }
 
    /**
     * @private
     */
    process_(){ 
        if (this.queue.length > 0){
            this.last_process = Date.now();
            let req = this.queue.shift();
            req.resolve(req.func());
            if (this.queue.length == 0) this.stop();
        } else {
            this.stop();
        }
    }

    start(){
        if (this.timer === undefined){
            this.timer = setInterval(function(){this.process_()}.bind(this), this.interval)
            if (Date.now() - this.last_process > this.interval) {
                this.process_();
            }
        }
    }

    stop(){
        if (this.timer !== undefined){
            clearInterval(this.timer);
            this.timer = undefined;
        }
    }

    clear(){
        this.queue = [];
        this.stop();
    }
}
module.exports = TimedQueue