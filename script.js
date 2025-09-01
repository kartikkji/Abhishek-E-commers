// Configuration
const WHATSAPP_NUMBER = '919310170486';
const COMPANY_NAME = 'SPARE PARTS';

// Data for 9 categories and their products
const categoriesData = {
    'Filter': {
        image: 'https://via.placeholder.com/300x150.png?text=Filter',
        products: [
            { name: 'Hydraulic Filter', price: '₹1,500', description: 'High-efficiency hydraulic filter.', image: 'https://via.placeholder.com/400x300.png?text=Hydraulic+Filter' },
            { name: 'Air Filter', price: '₹800', description: 'Engine air filter for dust protection.', image: 'https://via.placeholder.com/400x300.png?text=Air+Filter' },
            { name: 'Oil Filter', price: '₹1,200', description: 'Engine oil filter for particle removal.', image: 'https://via.placeholder.com/400x300.png?text=Oil+Filter' },
        ]
    },
    'Electricals': {
        image: 'https://via.placeholder.com/300x150.png?text=Electricals',
        products: [
            { name: 'Control Panel', price: '₹10,000', description: 'Complete control panel for machinery.', image: 'https://via.placeholder.com/400x300.png?text=Control+Panel' },
            { name: 'Sensor Module', price: '₹3,000', description: 'Precision sensor for machine diagnostics.', image: 'https://via.placeholder.com/400x300.png?text=Sensor' },
            { name: 'Limit Switch', price: '₹800', description: 'Safety limit switch for machinery.', image: 'https://via.placeholder.com/400x300.png?text=Limit+Switch' },
        ]
    },
    'Coupling': {
        image: 'https://via.placeholder.com/300x150.png?text=Coupling',
        products: [
            { name: 'Shaft Coupling', price: '₹2,500', description: 'Durable coupling for power transmission.', image: 'https://via.placeholder.com/400x300.png?text=Shaft+Coupling' },
            { name: 'Gear Coupling', price: '₹4,000', description: 'Robust gear coupling for heavy-duty applications.', image: 'https://via.placeholder.com/400x300.png?text=Gear+Coupling' },
        ]
    },
    'Pneumatics': {
        image: 'https://via.placeholder.com/300x150.png?text=Pneumatics',
        products: [
            { name: 'Pneumatic Valve', price: '₹1,200', description: 'Reliable valve for pneumatic systems.', image: 'https://via.placeholder.com/400x300.png?text=Pneumatic+Valve' },
            { name: 'Air Cylinder', price: '₹3,500', description: 'Cylinder for compressed air applications.', image: 'https://via.placeholder.com/400x300.png?text=Air+Cylinder' },
        ]
    },
    'Pipe Line': {
        image: 'https://via.placeholder.com/300x150.png?text=Pipe+Line',
        products: [
            { name: 'Concrete Pump Pipe', price: '₹4,000', description: 'Robust pipe for high-pressure concrete delivery.', image: 'https://via.placeholder.com/400x300.png?text=Concrete+Pipe' },
            { name: 'Reducer Pipe', price: '₹1,800', description: 'Pipe reducer for connecting different sizes.', image: 'https://via.placeholder.com/400x300.png?text=Reducer+Pipe' },
        ]
    },
    'Hose Pipe': {
        image: 'https://via.placeholder.com/300x150.png?text=Hose+Pipe',
        products: [
            { name: 'Conveying Hose', price: '₹2,500', description: 'Durable hose for concrete and mortar.', image: 'https://via.placeholder.com/400x300.png?text=Conveying+Hose' },
            { name: 'Hydraulic Hose', price: '₹1,500', description: 'Flexible and durable hose for fluid transfer.', image: 'https://via.placeholder.com/400x300.png?text=Hydraulic+Hose' },
        ]
    },
    'Hopper Parts': {
        image: 'https://via.placeholder.com/300x150.png?text=Hopper+Parts',
        products: [
            { name: 'Agitator Shaft', price: '₹7,500', description: 'Heavy-duty agitator shaft for uniform mixing.', image: 'https://via.placeholder.com/400x300.png?text=Agitator+Shaft' },
            { name: 'Mixing Paddles', price: '₹2,000', description: 'Replacement paddles for concrete mixers.', image: 'https://via.placeholder.com/400x300.png?text=Mixing+Paddles' },
        ]
    },
    'Hydraulics': {
        image: 'https://via.placeholder.com/300x150.png?text=Hydraulics',
        products: [
            { name: 'Hydraulic Pump', price: '₹25,000', description: 'High-performance pump for hydraulic systems.', image: 'https://via.placeholder.com/400x300.png?text=Hydraulic+Pump' },
            { name: 'S-Valve', price: '₹15,000', description: 'Critical S-valve for seamless concrete flow.', image: 'https://via.placeholder.com/400x300.png?text=S-Valve' },
        ]
    },
    'Seals': {
        image: 'https://via.placeholder.com/300x150.png?text=Seals',
        products: [
            { name: 'Oil Seal Kit', price: '₹800', description: 'Comprehensive kit for sealing hydraulic leaks.', image: 'https://via.placeholder.com/400x300.png?text=Oil+Seal' },
            { name: 'Gasket Set', price: '₹1,500', description: 'High-temperature gaskets for pump systems.', image: 'https://via.placeholder.com/400x300.png?text=Gasket+Set' },
        ]
    },
};

document.addEventListener('DOMContentLoaded', () => {
    const categoriesGrid = document.getElementById('categories-grid');
    const productList = document.getElementById('product-list');
    const categoryTitle = document.getElementById('category-title');

    // Logic for categories.html
    if (categoriesGrid) {
        for (const categoryName in categoriesData) {
            const categoryData = categoriesData[categoryName];
            const categoryCard = document.createElement('a');
            categoryCard.href = `products.html?category=${encodeURIComponent(categoryName)}`;
            categoryCard.classList.add('category-card');
            categoryCard.innerHTML = `
                <img src="${categoryData.image}" alt="${categoryName}">
                <h3>${categoryName}</h3>
            `;
            categoriesGrid.appendChild(categoryCard);
        }
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