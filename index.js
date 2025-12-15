import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.net.URI;

public class ShoppingCartApp extends JFrame {
    private DefaultListModel<String> cartModel;
    private JList<String> cartList;
    private JLabel totalLabel;
    private double total = 0.0;

    public ShoppingCartApp() {
        setTitle("Tech Gadget Store");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        // Main panel with background
        JPanel mainPanel = new JPanel(new GridBagLayout()) {
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                Graphics2D g2d = (Graphics2D) g;
                GradientPaint gradient = new GradientPaint(0, 0, new Color(245, 247, 250), getWidth(), getHeight(), new Color(195, 207, 226));
                g2d.setPaint(gradient);
                g2d.fillRect(0, 0, getWidth(), getHeight());
            }
        };

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(20, 20, 20, 20);

        // Products panel
        JPanel productsPanel = new JPanel(new GridBagLayout());
        productsPanel.setBackground(Color.WHITE);
        productsPanel.setPreferredSize(new Dimension(600, 600));
        productsPanel.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(new Color(226, 232, 240), 2),
            BorderFactory.createEmptyBorder(20, 20, 20, 20)
        ));

        JLabel productsTitle = new JLabel("Available Items");
        productsTitle.setFont(new Font("Segoe UI", Font.BOLD, 24));
        productsTitle.setHorizontalAlignment(SwingConstants.CENTER);
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 2;
        productsPanel.add(productsTitle, gbc);

        // Item 1: Wireless Headphones
        addItem(productsPanel, 1, "Wireless Headphones", 99.99,
                "https://lh3.googleusercontent.com/sitesv/AAzXCkeA1ztdIGLooAtJfAUmhdUod9RJScYBVL7a59n2rP6iiZPTT_wdoOrz7U8cUif2iWVz6xxalAVD9Zy-7Xj3qcT6uuLIEr4pUOTknFK3ZfSgbjkIo3a2wTMqeXXrsjwaBKl5s34OBM1ta7O53lUmz_4ACEe2tLw6GrNW3aOX4nBta3zGr0O5IKhdWl7Qm82m9LdVPxNb8FB7iauXKNVVZqE5Ivtxl8FuO3aiOZE=w1280");

        // Item 2: Mechanical Keyboard
        addItem(productsPanel, 2, "Mechanical Keyboard", 149.99,
                "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijak8WQERevbexfwoqGeNFzYbS4yPNF4PX1T2GE-ZJl1eilNXlyLAkRwLNipKH96WazgZuVeQBAaQhVBu4tpvdjb5h6Qwcp23QNFTy8CWEMB6TxtaQ3d6VJiIfISaPbs44lAdf9cEnvLqZnxrHWNm-j3zVAHjLBvS6JH1zij00Edux_HBNQv9sHjw9J3xK/w1200-h630-p-k-no-nu/center3.png");

        // Item 3: Gaming Mouse
        addItem(productsPanel, 3, "Gaming Mouse", 79.99,
                "https://lh3.googleusercontent.com/sitesv/AAzXCkeutTmMeLNxEdi0IPsVicMTxzuHxzNPKHN5orKi6TaDhgO1rJqVDScqr85ZlEKFa2M5-ZS23FTq2JkEsMAjm6E168d5LVI104VFFkfGaet38rpkEMgBU0Lmc5rZ3_FgH5pfJF3CwsJclK973UVj8LK1i34wovGoktfdp2oLtbZTiHjZjRMhsKqgms6P5TEQuQWfh5hr4A14WCfiiS89K4jdvmMhD8HQg9yGV6U=w1280");

        // Cart panel
        JPanel cartPanel = new JPanel(new BorderLayout());
        cartPanel.setBackground(Color.WHITE);
        cartPanel.setPreferredSize(new Dimension(400, 600));
        cartPanel.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(new Color(226, 232, 240), 2),
            BorderFactory.createEmptyBorder(20, 20, 20, 20)
        ));

        JLabel cartTitle = new JLabel("Shopping Cart");
        cartTitle.setFont(new Font("Segoe UI", Font.BOLD, 24));
        cartTitle.setHorizontalAlignment(SwingConstants.CENTER);
        cartPanel.add(cartTitle, BorderLayout.NORTH);

        cartModel = new DefaultListModel<>();
        cartList = new JList<>(cartModel);
        cartList.setFont(new Font("Segoe UI", Font.PLAIN, 16));
        JScrollPane scrollPane = new JScrollPane(cartList);
        cartPanel.add(scrollPane, BorderLayout.CENTER);

        totalLabel = new JLabel("Total: $0.00");
        totalLabel.setFont(new Font("Segoe UI", Font.BOLD, 24));
        totalLabel.setHorizontalAlignment(SwingConstants.RIGHT);
        cartPanel.add(totalLabel, BorderLayout.SOUTH);

        // Add panels to main
        gbc.gridx = 0;
        gbc.gridy = 0;
        mainPanel.add(productsPanel, gbc);

        gbc.gridx = 1;
        mainPanel.add(cartPanel, gbc);

        add(mainPanel, BorderLayout.CENTER);

        // Footer with external link
        JButton linkButton = new JButton("<HTML><U>Visit Amazon.com for more great deals!</U></HTML>");
        linkButton.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        linkButton.setForeground(Color.BLUE);
        linkButton.setBorderPainted(false);
        linkButton.setContentAreaFilled(false);
        linkButton.setCursor(new Cursor(Cursor.HAND_CURSOR));
        linkButton.addActionListener(e -> {
            try {
                Desktop.getDesktop().browse(new URI("https://www.amazon.com"));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        });

        JPanel footer = new JPanel();
        footer.setBackground(new Color(245, 247, 250));
        footer.add(linkButton);
        add(footer, BorderLayout.SOUTH);

        pack();
        setLocationRelativeTo(null);
        setExtendedState(JFrame.MAXIMIZED_BOTH); // Full screen for better view
    }

    private void addItem(JPanel panel, int row, String name, double price, String imageUrl) {
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(15, 15, 15, 15);
        gbc.gridx = 0;
        gbc.gridy = row;
        gbc.anchor = GridBagConstraints.WEST;

        // Image
        ImageIcon originalIcon = new ImageIcon(new java.net.URL(imageUrl));
        Image scaledImage = originalIcon.getImage().getScaledInstance(150, 150, Image.SCALE_SMOOTH);
        JLabel imageLabel = new JLabel(new ImageIcon(scaledImage));
        imageLabel.setBorder(BorderFactory.createLineBorder(new Color(226, 232, 240), 2));
        panel.add(imageLabel, gbc);

        // Details
        gbc.gridx = 1;
        gbc.anchor = GridBagConstraints.CENTER;
        JPanel details = new JPanel(new GridLayout(2, 1));
        details.setBackground(new Color(248, 250, 252));

        JLabel nameLabel = new JLabel(name);
        nameLabel.setFont(new Font("Segoe UI", Font.BOLD, 20));

        JLabel priceLabel = new JLabel("$" + String.format("%.2f", price));
        priceLabel.setFont(new Font("Segoe UI", Font.BOLD, 18));
        priceLabel.setForeground(new Color(72, 187, 120));

        details.add(nameLabel);
        details.add(priceLabel);
        panel.add(details, gbc);

        // Add button
        gbc.gridx = 2;
        JButton addButton = new JButton("Add");
        addButton.setFont(new Font("Segoe UI", Font.BOLD, 16));
        addButton.setBackground(new Color(66, 153, 225));
        addButton.setForeground(Color.WHITE);
        addButton.setFocusPainted(false);
        addButton.setCursor(new Cursor(Cursor.HAND_CURSOR));
        addButton.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                addButton.setBackground(new Color(49, 130, 206));
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                addButton.setBackground(new Color(66, 153, 225));
            }
        });

        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                cartModel.addElement(name + " - $" + String.format("%.2f", price));
                total += price;
                totalLabel.setText("Total: $" + String.format("%.2f", total));
            }
        });

        panel.add(addButton, gbc);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getSystemLookAndFeel());
            } catch (Exception e) {
                e.printStackTrace();
            }
            new ShoppingCartApp().setVisible(true);
        });
    }
}
