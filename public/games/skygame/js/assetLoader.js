// Load a list of image paths into an array of Image objects.
// Tolerant loader: if an individual path fails, it adds null and continues.
export function loadImageList(paths) {
    return Promise.all(paths.map((src) => new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
    })));
}

// Simple asset loader for images. Returns a map of Image objects.
export async function loadImages(assetMap) {
    const entries = Object.entries(assetMap);
    const loaded = {};

    // Load each asset but be tolerant: if a path fails, record null and continue.
    await Promise.all(entries.map(([key, srcs]) => new Promise((resolve) => {
        const candidates = Array.isArray(srcs) ? srcs : [srcs];

        const tryLoad = (index) => {
            if (index >= candidates.length) {
                loaded[key] = null;
                return resolve(null);
            }
            const src = candidates[index];
            const img = new Image();
            img.src = src;
            img.onload = () => {
                if (key === 'bird_sprite') {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, img.width, img.height);
                    const data = imageData.data;
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        // remove strong pink background pixels
                        if (r > 180 && g < 90 && b > 140 && r > b && r > g) {
                            data[i + 3] = 0;
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                    const processedImg = new Image();
                    processedImg.src = canvas.toDataURL();
                    processedImg.onload = () => {
                        loaded[key] = processedImg;
                        return resolve(processedImg);
                    };
                    processedImg.onerror = () => {
                        loaded[key] = img;
                        return resolve(img);
                    };
                } else {
                    loaded[key] = img;
                    return resolve(img);
                }
            };
            img.onerror = () => {
                // try next candidate
                tryLoad(index + 1);
            };
        };

        tryLoad(0);
    })));

    return loaded;
}
