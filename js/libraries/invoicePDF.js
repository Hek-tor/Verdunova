const invoicePDF = {
    async createPDF(invoice) {
        const doc = new jsPDF();
        const currentDate = new Date();
        const imageUrl = 'https://i.ibb.co/gyHDqMW/brand.jpg';
        const imageData = await getImageData(imageUrl);
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        const key = currentDate.toISOString().replace(/:/g, '-').replace(/\..+/, '');

        doc.addImage(imageData, 'JPG', 50, 15, 122, 45);
        const styles = {
            header: { fontSize: 28, textColor: '#114B5F', marginBottom: 10 },
            sectionTitle: { fontSize: 24, textColor: '#114B5F', marginBottom: 40 },
            text: { fontSize: 18, textColor: '#000000', marginBottom: 20 },
            date: { fontSize: 16, textColor: '#414141e1', marginBottom: 15 },
            totalPrice: { fontSize: 22, textColor: '#000000', marginTop: 5 },
            footer: { fontSize: 16, textColor: '#000000', marginTop: 5 }
        };

        function drawContent() {
            doc.setFontSize(styles.date.fontSize);
            doc.setTextColor(styles.date.textColor);
            doc.text(`Fecha de compra: ${formattedDate}`, 130, 15);

            doc.setFontSize(styles.header.fontSize);
            doc.setTextColor(styles.header.textColor);
            doc.text('Detalles del pedido', 105, 60, null, null, 'center');

            doc.setFontSize(styles.sectionTitle.fontSize);
            doc.setTextColor(styles.sectionTitle.textColor);
            doc.text('Cliente:', 10, 75);

            doc.setFontSize(styles.text.fontSize);
            doc.setTextColor(styles.text.textColor);
            doc.text(`Nombre: ${invoice.customer[0]}`, 15, 90);
            doc.text(`Teléfono: ${invoice.customer[1]}`, 15, 105);
            doc.text(`Dirección: ${invoice.customer[2]}`, 15, 120);

            doc.setFontSize(styles.sectionTitle.fontSize);
            doc.setTextColor(styles.sectionTitle.textColor);
            doc.text('Productos:', 10, 135);

            doc.setFontSize(styles.text.fontSize);
            doc.setTextColor(styles.text.textColor);
            let positionY = 150;
            invoice.orders.forEach((product, index) => {
                doc.text(`Pedido ${index + 1}) ${product}.`, 15, positionY);
                positionY += 15;
            });

            doc.setFontSize(styles.sectionTitle.fontSize);
            doc.setTextColor(styles.sectionTitle.textColor);

            doc.setFontSize(styles.totalPrice.fontSize);
            doc.setTextColor(styles.totalPrice.textColor);
            let price = formatPrice(invoice.totalPrice);
            doc.text(`Monto total a cancelar`, 20, positionY + 15);
            doc.text(`${price} colones.`, 20, positionY + 30);
            const nota = [
                'El monto lo puedes cancelar por sinpe móvil al número 88 92 73 35',
                'o cancelarlo en efectivo cuando se te entregue el pedido.'
            ];
            let yPosition = doc.internal.pageSize.height - 20;
            nota.forEach(line => {
                doc.setFontSize(styles.footer.fontSize);
                doc.setTextColor(styles.footer.textColor);
                doc.text(line, 20, yPosition);
                yPosition += 10;
            });
        }
        try {
            drawContent();
            doc.save(`Factura de ${invoice.customer[0]} ID:${key}.pdf`);
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