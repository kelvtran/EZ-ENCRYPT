async function genAESKey(keysize) {
    // Generate a random key of desrired size (128, 192, 256 bit)
    let secretKey = await window.crypto.subtle.generateKey(
        {
            name: "AES-CBC",
            length: keysize
        }, 
        true, 
        ["encrypt", "decrypt"]
    )

    // Convert the key to a hex string

    // Export the key to a buffer -- key object to bytes buffer
    let secretKeyBuffer = await window.crypto.subtle.exportKey("raw", secretKey);
    // Convert the buffer to an array -- array of bytes i.e [255, 0, 128, ..