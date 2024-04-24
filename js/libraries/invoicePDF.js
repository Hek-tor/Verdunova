const invoicePDF = {
    async createPDF(invoice) {
        const doc = new jsPDF();
        const imageUrl = 'https://i.ibb.co/gyHDqMW/brand.jpg';
        const imageData = await getImageData(imageUrl);
        doc.addImage(imageData, 'JPG', 50, 5, 122, 52);
        const styles = {
            header: { fontSize: 32, textColor: '#114B5F', marginBottom: 10 },
            sectionTitle: { fontSize: 25, textColor: '#114B5F', marginBottom: 40 },
            text: { fontSize: 21, textColor: '#000000', marginBottom: 20 },
            totalPrice: { fontSize: 26, textColor: '#000000', marginTop: 5 }
        };

        function drawContent() {
            doc.setFontSize(styles.header.fontSize);
            doc.setTextColor(styles.header.textColor);
            doc.text('Detalles del pedido', 105, 60, null, null, 'center');

            doc.setFontSize(styles.sectionTitle.fontSize);
            doc.setTextColor(styles.sectionTitle.textColor);
            doc.text('Cliente:', 20, 75);

            doc.setFontSize(styles.text.fontSize);
            doc.setTextColor(styles.text.textColor);
            doc.text(`Nombre: ${invoice.customer[0]}`, 35, 90);
            doc.text(`Teléfono: ${invoice.customer[1]}`, 35, 105);
            doc.text(`Dirección: ${invoice.customer[2]}`, 35, 120);

            doc.setFontSize(styles.sectionTitle.fontSize);
            doc.setTextColor(styles.sectionTitle.textColor);
            doc.text('Productos:', 20, 135);

            doc.setFontSize(styles.text.fontSize);
            doc.setTextColor(styles.text.textColor);
            let positionY = 150;
            invoice.orders.forEach((product, index) => {
                doc.text(`Pedido ${index + 1}) ${product}.`, 35, positionY);
                positionY += 15;
            });

            doc.setFontSize(styles.sectionTitle.fontSize);
            doc.setTextColor(styles.sectionTitle.textColor);

            doc.setFontSize(styles.totalPrice.fontSize);
            doc.setTextColor(styles.totalPrice.textColor);
            let price = formatPrice(invoice.totalPrice);
            doc.text(`Monto total a cancelar`, 20, positionY + 15);
            doc.text(`${price} colones.`, 20, positionY + 30);
        }
        try {
            drawContent();
            doc.save(`Factura de ${invoice.customer[0]} Verdunova.pdf`);
        } catch (error) {
            console.error('Error al cargar la fuente o generar el PDF:', error);
        }
    }
};

function formatPrice(num) {
    let price = num.toString();
    if (price.length > 3) {
        let index = price.length - 3;
        price = price.slice(0, index) + '.' + price.slice(index);
    }
    return price;
}

async function getImageData(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

export default invoicePDF;