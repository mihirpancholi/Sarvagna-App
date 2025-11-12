// helpers/sevak.helper.js
const fs = require('fs');
const path = require('path');

// --- Define Base Paths from Debug Test ---
const publicSrcPath = path.join(__dirname, '..');
const projectRoot = path.join(__dirname, '..', '..', '..');
const dummyImagePath = path.join(projectRoot, 'public/src/upload', 'dummy_sevak.jpg');

// --- Pre-load the dummy image buffer ---
let dummyImageBuffer = null;
try {
    dummyImageBuffer = fs.readFileSync(dummyImagePath);
    console.log(`[DEBUG] SUCCESS: Dummy image loaded into buffer.`);
} catch (e) {
    console.error(`[DEBUG] CRITICAL: Failed to read dummy image at ${dummyImagePath}: ${e.message}`);
}

/**
 * Gets a BUFFER of the sevak's photo.
 * @param {object} sevak - The sevak object from the database
 * @param {string} imageType - 'current' or 'talim'
 * @returns {Buffer|null} - A buffer of the image, or the dummy buffer, or null
 */
function getSevakPhotoBuffer(sevak, imageType) {
    let dbPath = null;

    if (imageType === 'current') {
        dbPath = sevak.latest_photo || sevak.sevak_photo;
    } else { // 'talim'
        dbPath = sevak.sevak_photo;
    }

    if (dbPath) {
        // This is the correct path from your debug test
        const finalPhotoPath = path.join(publicSrcPath, dbPath);

        try {
            // Check if file exists AND is readable
            fs.accessSync(finalPhotoPath, fs.constants.R_OK);
            // Read the file into a buffer
            const fileBuffer = fs.readFileSync(finalPhotoPath);
            return fileBuffer;
        } catch (readError) {
            console.error(`[DEBUG] Sevak ${sevak.ytk_id}: FAILED to read file at ${finalPhotoPath}. Error: ${readError.message}`);
        }
    }

    // If no real image was found, return the dummy buffer
    return dummyImageBuffer;
}

// Note the new function name in the export
module.exports = { getSevakPhotoBuffer };