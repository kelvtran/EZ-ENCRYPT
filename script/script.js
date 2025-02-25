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
    // Convert the buffer to an array -- array of bytes i.e [255, 0, 128, ...]
    let secretKeyArray = Array.from(new Uint8Array(secretKeyBuffer));
    // Converts each byte in array to a hex string and joins them together and ensures each byte is 2 characters long with padding
    let secretKeyHex = secretKeyArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    // Display the key on the page
    document.getElementById("aes-key").innerHTML = secretKeyHex;
    document.getElementById("aes-key").style.display = "block";
    document.getElementById("aes-key-input").value = secretKeyHex;
}

async function aesEncrypt(){

    // Get the key from the input field
    let key = document.getElementById("aes-key-input").value;
    
    // validate the key input
    if (key.length != 32 && key.length != 64) {
        alert("Invalid key length");
        return;
    }

    keyBuffer = hexToBuffer(key);
    // Convert the key to a key object
    let secretKey = await window.crypto.subtle.importKey(
        "raw",
        keyBuffer,
        {name: "AES-CBC"},
        false,
        ["encrypt"]
    );

    // Get the plaintext from the input field
    let plaintext = document.getElementById("aes-plaintext").value;
    // Convert the plaintext to bytes i.e buffer
    let plaintextBuffer = new TextEncoder().encode(plaintext);



    // Encrypt the plaintext
    // Generate a random IV for randomness when encrypting
    let iv = window.crypto.getRandomValues(new Uint8Array(16));

    return window.crypto.subtle.encrypt(
        {
            name: "AES-CBC",
            iv: iv
        },
        secretKey,
        plaintextBuffer
    ).then(encrypted => {
        // Convert the encrypted data to a buffer
        // raw byte converred to 8 bit unsigned integer array
        let encryptedArray = Array.from(new Uint8Array(encrypted));
        // Convert the IV to a hex string
        let ivHex = Array.from(iv).map(byte => byte.toString(16).padStart(2, '0')).join('');
        // Convert the encrypted data to a hex string
        let encryptedHex = encryptedArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

        // Display the IV and encrypted data on the page
        // document.getElementById("aes-iv").innerHTML = ivHex;
        // document.getElementById("aes-iv").style.display = "block";
        document.getElementById("aes-ciphertext").innerHTML = ivHex + encryptedHex;
        
    });
}

function hexToBuffer(hex){
    // validate the hex string
    if (hex.length % 2 != 0) {
        throw new Error('Invalid hex string');
    }
    // Convert the hex string (treated as String) to an array 
    // need to be half the length of the hex string as each value in Uint8Array is 8 bits

    let binary = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        binary[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return binary;
}
