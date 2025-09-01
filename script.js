// Configuration
const WHATSAPP_NUMBER = '919310170486';
const COMPANY_NAME = 'SPARE PARTS';
const IMAGE_GEN_URL = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=';

// Data for 9 categories and their products with prompts for image generation
const categoriesData = {
    'Filter': {
        prompt: 'A close-up, high-quality, professional product photo of a heavy-duty machinery filter in a clean, modern setting.',
        products: [
            { name: 'Hydraulic Filter', price: '₹1,500', description: 'High-efficiency hydraulic filter.', image: 'https://via.placeholder.com/400x300.png?text=Hydraulic+Filter' },
            { name: 'Air Filter', price: '₹800', description: 'Engine air filter for dust protection.', image: 'https://via.placeholder.com/400x300.png?text=Air+Filter' },
            { name: 'Oil Filter', price: '₹1,200', description: 'Engine oil filter for particle removal.', image: 'https://via.placeholder.com/400x300.png?text=Oil+Filter' },
        ]
    },
    'Electricals': {
        prompt: 'A professional product photo of a variety of industrial electrical components, including wires, circuit boards, and sensors, on a work table.',
        products: [
            { name: 'Control Panel', price: '₹10,000', description: 'Complete control panel for machinery.', image: 'https://via.placeholder.com/400x300.png?text=Control+Panel' },
            { name: 'Sensor Module', price: '₹3,000', description: 'Precision sensor for machine diagnostics.', image: 'https://via.placeholder.com/400x300.png?text=Sensor' },
            { name: 'Limit Switch', price: '₹800', description: 'Safety limit switch for machinery.', image: 'https://via.placeholder.com/400x300.png?text=Limit+Switch' },
        ]
    },
    'Coupling': {
        prompt: 'A close-up, high-resolution photo of a metallic shaft coupling, showing its intricate design and robust construction.',
        products: [
            { name: 'Shaft Coupling', price: '₹2,500', description: 'Durable coupling for power transmission.', image: 'https://via.placeholder.com/400x300.png?text=Shaft+Coupling' },
            { name: 'Gear Coupling', price: '₹4,000', description: 'Robust gear coupling for heavy-duty applications.', image: 'https://via.placeholder.com/400x300.png?text=Gear+Coupling' },
        ]
    },
    'Pneumatics': {
        prompt: 'A professional product photo of a pneumatic valve and a compressed air cylinder, showcasing clean, smooth metal surfaces.',
        products: [
            { name: 'Pneumatic Valve', price: '₹1,200', description: 'Reliable valve for pneumatic systems.', image: 'https://via.placeholder.com/400x300.png?text=Pneumatic+Valve' },
            { name: 'Air Cylinder', price: '₹3,500', description: 'Cylinder for compressed air applications.', image: 'https://via.placeholder.com/400x300.png?text=Air+Cylinder' },
        ]
    },
    'Pipe Line': {
        prompt: 'A high-angle photo of a heavy-duty industrial pipe line, with a focus on its durability and wide diameter.',
        products: [
            { name: 'Concrete Pump Pipe', price: '₹4,000', description: 'Robust pipe for high-pressure concrete delivery.', image: 'https://via.placeholder.com/400x300.png?text=Concrete+Pipe' },
            { name: 'Reducer Pipe', price: '₹1,800', description: 'Pipe reducer for connecting different sizes.', image: 'https://via.placeholder.com/400x300.png?text=Reducer+Pipe' },
        ]
    },
    'Hose Pipe': {
        prompt: 'A dynamic, high-quality photo of a durable, flexible hydraulic hose pipe coiled neatly, with metallic fittings visible.',
        products: [
            { name: 'Conveying Hose', price: '₹2,500', description: 'Durable hose for concrete and mortar.', image: 'https://via.placeholder.com/400x300.png?text=Conveying+Hose' },
            { name: 'Hydraulic Hose', price: '₹1,500', description: 'Flexible and durable hose for fluid transfer.', image: 'https://via.placeholder.com/400x300.png?text=Hydraulic+Hose' },
        ]
    },
    'Hopper Parts': {
        prompt: 'A high-resolution photo of hopper parts, including an agitator shaft and mixing paddles, clean and ready for installation.',
        products: [
            { name: 'Agitator Shaft', price: '₹7,500', description: 'Heavy-duty agitator shaft for uniform mixing.', image: 'https://via.placeholder.com/400x300.png?text=Agitator+Shaft' },
            { name: 'Mixing Paddles', price: '₹2,000', description: 'Replacement paddles for concrete mixers.', image: 'https://via.placeholder.com/400x300.png?text=Mixing+Paddles' },
        ]
    },
    'Hydraulics': {
        prompt: 'A detailed, professional photo of a hydraulic pump and an S-valve, showing their heavy-duty mechanical components.',
        products: [
            { name: 'Hydraulic Pump', price: '₹25,000', description: 'High-performance pump for hydraulic systems.', image: 'https://via.placeholder.com/400x300.png?text=Hydraulic+Pump' },
            { name: 'S-Valve', price: '₹15,000', description: 'Critical S-valve for seamless concrete flow.', image: 'https://via.placeholder.com/400x300.png?text=S-Valve' },
        ]
    },
    'Seals': {
        prompt: 'A close-up product photo of a variety of seals and gaskets, highlighting their flexible rubber and synthetic materials.',
        products: [
            { name: 'Oil Seal Kit', price: '₹800', description: 'Comprehensive kit for sealing hydraulic leaks.', image: 'https://via.placeholder.com/400x300.png?text=Oil+Seal' },
            { name: 'Gasket Set', price: '₹1,500', description: 'High-temperature gaskets for pump systems.', image: 'https://via.placeholder.com/400x300.png?text=Gasket+Set' },
        ]
    },
};

/**
 * Handles the fetch request to the image generation API with exponential backoff.
 * @param {string} url The API endpoint URL.
 * @param {object} options The fetch options.
 * @param {number} retries The number of retries left.
 * @param {number} delay The delay in milliseconds before the next retry.
 * @returns {Promise<Response>} The fetch response.
 */
async function fetchWithRetry(url, options, retries = 5, delay = 1000) {
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            return response;
        } else if (response.status === 429 && retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries - 1, delay * 2);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries - 1, delay * 2);
        } else {
            throw error;
        }
    }
}

/**
 * Generates an image using the Imagen API.
 * @param {string} prompt The text prompt for the image.
 * @returns {Promise<string|null>} The base64-encoded image data URL or null on failure.
 */
async function generateImage(prompt) {
    const payload = {
        instances: [{ prompt: prompt }],
        parameters: { sampleCount: 1 }
    };
    const apiKey = "";
    const apiUrl = `${IMAGE_GEN_URL}${apiKey}`;

    try {
        const response = await fetchWithRetry(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        const base64Data = result?.predictions?.[0]?.bytesBase64Encoded;
        if (base64Data) {
            return `data:image/png;base64,${base64Data}`;
        }
        return null;
    } catch (error) {
        console.error("Image generation failed:", error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle for mobile
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const categoriesGrid = document.getElementById('categories-grid');
    const productList = document.getElementById('product-list');
    const categoryTitle = document.getElementById('category-title');

    // Logic for categories.html
    if (categoriesGrid) {
        const categoryNames = Object.keys(categoriesData);
        
        // Create skeleton cards and start image generation
        categoryNames.forEach(categoryName => {
            const categoryCard = document.createElement('a');
            categoryCard.href = `products.html?category=${encodeURIComponent(categoryName)}`;
            categoryCard.classList.add('category-card');
            
            // Add a loading state
            categoryCard.innerHTML = `
                <img src="https://via.placeholder.com/300x150.png?text=Loading..." alt="Loading image for ${categoryName}">
                <h3>${categoryName}</h3>
            `;
            categoriesGrid.appendChild(categoryCard);

            // Generate image for each category and update the card
            const prompt = categoriesData[categoryName].prompt;
            generateImage(prompt).then(imageUrl => {
                const imgElement = categoryCard.querySelector('img');
                if (imageUrl) {
                    imgElement.src = imageUrl;
                    imgElement.alt = `Image for ${categoryName}`;
                } else {
                    imgElement.src = `https://via.placeholder.com/300x150.png?text=Image+Failed`;
                    imgElement.alt = `Image not available for ${categoryName}`;
                }
            });
        });
    }

    // Logic for products.html
    if (productList && categoryTitle) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryName = urlParams.get('category');

        if (categoryName && categoriesData[categoryName]) {
            categoryTitle.textContent = categoryName;
            const products = categoriesData[categoryName].products;

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                const whatsappMessage = `Hello ${COMPANY_NAME}, I would like to inquire about the following product:%0A%0AProduct: ${product.name}%0APrice: ${product.price}%0A%0AThank you!`;
                const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <div class="price">${product.price}</div>
                    <a href="${whatsappLink}" target="_blank" class="whatsapp-buy-button">
                        <i class="fab fa-whatsapp"></i> Buy on WhatsApp
                    </a>
                `;
                productList.appendChild(productCard);
            });
        } else {
            // Redirect to categories page if no valid category is found
            window.location.href = 'categories.html';
        }
    }
});