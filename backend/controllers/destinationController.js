const destinations = [
  {
    id: 1,
    name: "Pantai Kuta",
    location: "Bali",
    rating: 4.8,
    estimatedBudget: 1500000,
    mapLink: "https://maps.google.com/?q=Pantai+Kuta",
    tags: ["Bali", "Pantai"],
    imageUrl:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Candi Borobudur",
    location: "Yogyakarta",
    rating: 4.9,
    estimatedBudget: 1200000,
    mapLink: "https://maps.google.com/?q=Candi+Borobudur",
    tags: ["Yogyakarta", "Budaya"],
    imageUrl:
      "https://images.unsplash.com/photo-1584824486509-112e4181ff13?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Taman Nasional Komodo",
    location: "Labuan Bajo",
    rating: 5.0,
    estimatedBudget: 3500000,
    mapLink: "https://maps.google.com/?q=Pulau+Komodo",
    tags: ["Labuan Bajo", "Alam"],
    imageUrl:
      "https://images.unsplash.com/photo-1516926315201-903e1e2dce48?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Gunung Rinjani",
    location: "Lombok",
    rating: 4.7,
    estimatedBudget: 2000000,
    mapLink: "https://maps.google.com/?q=Gunung+Rinjani",
    tags: ["Lombok", "Gunung"],
    imageUrl:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80",
  },
];

exports.getAllDestinations = (req, res) => {
  try {
    const { search } = req.query;
    let result = destinations;

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
