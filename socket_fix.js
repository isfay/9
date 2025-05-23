// تعديلات لحل مشكلة syscall(socket)errno:24
window.num_sds = 0x80;  
window.num_alias = 100;

window.sleep = function(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {}
};

const originalNewSocket = window.new_socket;
window.new_socket = function() {
    try {
        window.sleep(50);
        return originalNewSocket();
    } catch (e) {
        window.sleep(200);
        return originalNewSocket();
    }
};