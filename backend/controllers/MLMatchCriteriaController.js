import MLMatchCriteria from "../models/MLMatchCriteria";

export const getMLMatches = async (req, res) => {
  try {
    const matches = await MLMatchCriteria.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMLMatch = async (req, res) => {
  try {
    const match = new MLMatchCriteria(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};