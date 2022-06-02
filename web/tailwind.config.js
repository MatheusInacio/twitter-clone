module.exports = {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                birdBlue: {
                    500: "#1D9BF0",
                },
                platinum: {
                    500: "#E7E9EA",
                },
                silver: {
                    500: "#71767B",
                },
                onix: {
                    500: "#333639",
                },
                richBlack: {
                    500: "#15202B",
                },
                borderRadius: {
                    md: "4px",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};