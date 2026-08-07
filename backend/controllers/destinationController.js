// Data Sementara (Mock Data) sebagai pengganti database
const destinations = [
  {
    id: 1,
    name: "Pantai Kuta",
    location: "Bali",
    rating: 4.8,
    estimatedBudget: 1500000,
    mapLink: "https://maps.google.com/?q=Pantai+Kuta",
    tags: ["Bali"],
  },
  {
    id: 2,
    name: "Candi Borobudur",
    location: "Yogyakarta",
    rating: 4.9,
    estimatedBudget: 1200000,
    mapLink: "https://maps.google.com/?q=Candi+Borobudur",
    tags: ["Yogyakarta"],
  },
  {
    id: 3,
    name: "Pulau Komodo",
    location: "Labuan Bajo",
    rating: 5.0,
    estimatedBudget: 3500000,
    mapLink: "https://maps.google.com/?q=Pulau+Komodo",
    tags: ["Labuan Bajo"],
  },
  {
    id: 4,
    name: "Gunung Rinjani",
    location: "Lombok",
    rating: 4.7,
    estimatedBudget: 2000000,
    mapLink: "https://maps.google.com/?q=Gunung+Rinjani",
    tags: ["Lombok"],
  },
];

exports.getAllDestinations = (req, res) => {
  try {
    const { search } = req.query;
    let result = destinations;

    // Fitur Filter berdasarkan daerah
    if (search) {
      result = destinations.filter(
        (d) =>
          d.location.toLowerCase().includes(search.toLowerCase()) ||
          d.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase()),
          ),
      );
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error });
  }
};
