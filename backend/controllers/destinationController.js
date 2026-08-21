const mongoose = require("mongoose");
const Destination = require("../models/Destination");

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

const culinaryPlaces = [
  {
    id: "culinary-1",
    name: "Warung Nasi Ayam Kedewatan",
    region: "Bali",
    description: "Nasi ayam khas Bali dengan sambal matah dan lawar.",
    imageUrl:
      "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "culinary-2",
    name: "Gudeg Yu Djum",
    region: "Yogyakarta",
    description: "Gudeg nangka manis dengan pilihan ayam dan telur.",
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "culinary-3",
    name: "Se'i Sapi Lamalera",
    region: "Labuan Bajo",
    description: "Daging asap khas Nusa Tenggara dengan sambal lu'at.",
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "culinary-4",
    name: "Ayam Taliwang Irama",
    region: "Lombok",
    description: "Ayam bakar pedas dengan plecing kangkung segar.",
    imageUrl:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "culinary-5",
    name: "Rumah Makan Padang Sederhana",
    region: "Sumatera Utara",
    description: "Hidangan Minang autentik dengan rendang sebagai andalan.",
    imageUrl:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "culinary-6",
    name: "Rawon Nguling",
    region: "Jawa Timur",
    description: "Rawon kuah kluwek legendaris dengan daging yang lembut.",
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
  },
];

exports.getAllDestinations = (req, res) => {
  try {
    const { search } = req.query;
    let result = destinations;

    if (mongoose.connection.readyState === 1) {
      return Destination.find()
        .lean()
        .then((databaseDestinations) => {
          if (databaseDestinations.length > 0) {
            result = databaseDestinations;
          }
          return sendDestinationResults(result, req, res);
        })
        .catch(() => sendDestinationResults(result, req, res));
    }

    sendDestinationResults(result, req, res);
  } catch (error) {
    // <-- INI ADALAH BAGIAN YANG SEBELUMNYA TERHAPUS
    res.status(500).json({ message: "Gagal mengambil data", error });
  }
};

function sendDestinationResults(source, req, res) {
  const { search } = req.query;
  let result = source;

  if (search) {
    const normalizedSearch = search.toLowerCase();
    result = source.filter(
      (destination) =>
        destination.location.toLowerCase().includes(normalizedSearch) ||
        destination.name.toLowerCase().includes(normalizedSearch) ||
        destination.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedSearch),
        ),
    );
  } else if (req.query.all !== "true") {
    result = [...source].sort((a, b) => b.rating - a.rating).slice(0, 4);
  }

  res.status(200).json(result);
}

exports.getAllCulinary = (req, res) => {
  try {
    const { search = "" } = req.query;
    const normalizedSearch = search.toLowerCase();
    const result = normalizedSearch
      ? culinaryPlaces.filter(
          (place) =>
            place.region.toLowerCase().includes(normalizedSearch) ||
            place.name.toLowerCase().includes(normalizedSearch),
        )
      : culinaryPlaces;

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data kuliner", error });
  }
};

exports.getDestinationById = (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1 && mongoose.isValidObjectId(id)) {
      return Destination.findById(id)
        .lean()
        .then((destination) => {
          if (destination) return res.status(200).json(destination);
          return res.status(404).json({ message: "Destinasi tidak ditemukan" });
        })
        .catch(() => res.status(500).json({ message: "Gagal mengambil data" }));
    }

    const destination = destinations.find(
      (item) => item.id === parseInt(id, 10),
    );
    if (!destination)
      return res.status(404).json({ message: "Destinasi tidak ditemukan" });
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error });
  }
};
