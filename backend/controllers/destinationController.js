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
    location: "Jawa Tengah",
    rating: 4.9,
    estimatedBudget: 1200000,
    mapLink: "https://maps.google.com/?q=Candi+Borobudur",
    tags: ["Jawa", "Budaya", "Yogyakarta"],
    imageUrl:
      "https://images.unsplash.com/photo-1584824486509-112e4181ff13?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Taman Nasional Komodo",
    location: "Nusa Tenggara Timur",
    rating: 5.0,
    estimatedBudget: 3500000,
    mapLink: "https://maps.google.com/?q=Pulau+Komodo",
    tags: ["NTT", "Alam", "Labuan Bajo"],
    imageUrl:
      "https://images.unsplash.com/photo-1516926315201-903e1e2dce48?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Gunung Rinjani",
    location: "Nusa Tenggara Barat",
    rating: 4.7,
    estimatedBudget: 2000000,
    mapLink: "https://maps.google.com/?q=Gunung+Rinjani",
    tags: ["Lombok", "Gunung", "NTB"],
    imageUrl:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Raja Ampat",
    location: "Papua Barat",
    rating: 5.0,
    estimatedBudget: 8000000,
    mapLink: "https://maps.google.com/?q=Raja+Ampat",
    tags: ["Papua", "Pantai", "Diving", "Laut"],
    imageUrl:
      "https://images.unsplash.com/photo-1516690553959-71a414d6b9b6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Danau Toba",
    location: "Sumatera Utara",
    rating: 4.7,
    estimatedBudget: 2500000,
    mapLink: "https://maps.google.com/?q=Danau+Toba",
    tags: ["Sumatra", "Danau", "Alam", "Medan"],
    imageUrl:
      "https://images.unsplash.com/photo-1603525166419-f076b1fcaaa3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Gunung Bromo",
    location: "Jawa Timur",
    rating: 4.8,
    estimatedBudget: 1800000,
    mapLink: "https://maps.google.com/?q=Gunung+Bromo",
    tags: ["Jawa", "Gunung", "Alam", "Malang"],
    imageUrl:
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Kepulauan Derawan",
    location: "Kalimantan Timur",
    rating: 4.8,
    estimatedBudget: 4500000,
    mapLink: "https://maps.google.com/?q=Kepulauan+Derawan",
    tags: ["Kalimantan", "Pantai", "Diving", "Pulau"],
    imageUrl:
      "https://images.unsplash.com/photo-1570789721731-081cbce1f600?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Tana Toraja",
    location: "Sulawesi Selatan",
    rating: 4.7,
    estimatedBudget: 3000000,
    mapLink: "https://maps.google.com/?q=Tana+Toraja",
    tags: ["Sulawesi", "Budaya", "Alam", "Makassar"],
    imageUrl:
      "https://images.unsplash.com/photo-1541280910158-c4e14ef26207?auto=format&fit=crop&w=800&q=80",
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
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase()),
          ),
      );
    } else {
      result = destinations.sort((a, b) => b.rating - a.rating).slice(0, 4);
    }

    res.status(200).json(result);
  } catch (error) {
    // <-- INI ADALAH BAGIAN YANG SEBELUMNYA TERHAPUS
    res.status(500).json({ message: "Gagal mengambil data", error });
  }
};

exports.getDestinationById = (req, res) => {
  try {
    const { id } = req.params;
    const destination = destinations.find((d) => d.id === parseInt(id));
    if (!destination)
      return res.status(404).json({ message: "Destinasi tidak ditemukan" });
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error });
  }
};
