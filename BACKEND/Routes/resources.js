const express = require('express');

const router = express.Router();

// 🍼 Baby care tips
const babyCareTips = [
  "Keep your baby’s immunization schedule up to date.",
  "Always wash your hands before touching your baby.",
  "Ensure your baby sleeps on their back to reduce SIDS risk.",
  "Sterilize feeding bottles and pacifiers regularly.",
  "Burp your baby after every feeding session.",
  "Keep your baby’s nails trimmed to prevent scratches.",
  "Ensure your baby gets enough tummy time during the day.",
  "Dress your baby appropriately for the weather.",
  "Monitor your baby’s milestones but don’t compare too much.",
  "Use mild, fragrance-free baby products.",
  "Avoid shaking your baby under any circumstances.",
  "Always support your baby’s head and neck.",
  "Don’t leave your baby unattended on high surfaces.",
  "Respond to your baby’s cries — it builds trust.",
  "Visit your pediatrician regularly for check-ups."
];

// ❓ Frequently Asked Questions
const faqs = [
  { question: "When should my baby get their first vaccine?", answer: "At birth — usually the BCG and polio vaccines." },
  { question: "What if my baby misses a vaccination date?", answer: "Visit your nearest health center as soon as possible. The schedule will be adjusted." },
  { question: "How can I tell if my baby has a fever after vaccination?", answer: "Check with a thermometer. Mild fever is normal, but see a doctor if it persists beyond 48 hours." },
  { question: "How often should I bathe my newborn?", answer: "2–3 times per week is enough; daily sponge baths for hygiene are okay." },
  { question: "When can I start giving my baby solid foods?", answer: "At around 6 months, as advised by your pediatrician." },
  { question: "Is it normal for my baby to spit up after feeding?", answer: "Yes, small amounts are common. If it’s excessive, consult your doctor." },
  { question: "Can I use regular soap on my baby?", answer: "Use mild, fragrance-free baby soap only." },
  { question: "How can I soothe a teething baby?", answer: "Give a clean teething ring and gently massage gums." },
  { question: "When will my baby start sleeping through the night?", answer: "Most babies do between 3–6 months, though it varies." },
  { question: "Is breastfeeding alone enough for 6 months?", answer: "Yes — breast milk has all the nutrients your baby needs." },
  { question: "Can I travel with my baby?", answer: "Yes, but make sure vaccinations are up to date and carry essentials." },
  { question: "How can I prevent diaper rash?", answer: "Change diapers often and keep the area dry and clean." },
  { question: "Should I wake my baby for feeds?", answer: "In the first few weeks, yes. Later, feed on demand." },
  { question: "How can I tell if my baby is getting enough milk?", answer: "Frequent wet diapers and steady weight gain are good signs." },
  { question: "When should I be worried about my baby’s cough?", answer: "If it’s persistent or affects feeding, breathing, or sleep, seek medical care." }
];


//CRUD routes for resources
router.get('/tips', (req, res) => {
  res.json(babyCareTips);
});

router.get('/faqs', (req, res) => {
  res.json(faqs);
});
module.exports = router;