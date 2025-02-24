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
    secretKeyHex = await window.crypto.subtle.exportKey("raw", secretKey)
    secretKeyHex = await byteToHex(secretKey)

    document.getElementById("aes-key").innerHTML = secretKeyHex;
}

async function byteToHex(buffer) {