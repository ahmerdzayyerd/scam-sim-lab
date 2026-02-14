// Common BIP-39 words that appear frequently in real seed phrases
const BIP39_COMMON = new Set([
  "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract",
  "absurd", "abuse", "access", "accident", "account", "accuse", "achieve", "acid",
  "acoustic", "acquire", "across", "action", "actor", "actress", "actual", "adapt",
  "add", "addict", "address", "adjust", "admit", "adult", "advance", "advice",
  "aerobic", "affair", "afford", "afraid", "again", "age", "agent", "agree",
  "ahead", "aim", "air", "airport", "aisle", "alarm", "album", "alcohol",
  "alert", "alien", "all", "alley", "allow", "almost", "alone", "alpha",
  "already", "also", "alter", "always", "amateur", "amazing", "among", "amount",
  "amused", "analyst", "anchor", "ancient", "anger", "angle", "angry", "animal",
  "ankle", "announce", "annual", "another", "answer", "antenna", "antique", "anxiety",
  "any", "apart", "apology", "appear", "apple", "approve", "april", "arch",
  "arctic", "area", "arena", "argue", "arm", "armed", "armor", "army",
  "arrange", "arrest", "arrive", "arrow", "art", "artefact", "artist", "artwork",
  "ask", "aspect", "assault", "asset", "assist", "assume", "asthma", "athlete",
  "atom", "attack", "attend", "attitude", "attract", "auction", "audit", "august",
  "aunt", "author", "auto", "autumn", "average", "avocado", "avoid", "awake",
  "aware", "awesome", "awful", "awkward", "axis",
  "baby", "bachelor", "bacon", "badge", "bag", "balance", "balcony", "ball",
  "banana", "banner", "bar", "barely", "bargain", "barrel", "base", "basic",
  "basket", "battle", "beach", "bean", "beauty", "because", "become", "beef",
  "word", "world", "worry", "worth", "wrap", "wreck", "wrestle", "wrist",
  "write", "wrong", "yard", "year", "yellow", "you", "young", "youth",
  "zebra", "zero", "zone", "zoo",
]);

const PLACEHOLDER_PHRASE = "PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE";
                          "PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE PHRASE";

export function validateSimulatedPhrase(input: string): {
  isValid: boolean;
  isPlaceholder: boolean;
  isDangerous: boolean;
  message: string;
} {
  const trimmed = input.trim().toLowerCase();
  const words = trimmed.split(/\s+/);

  // Check for placeholder
  if (trimmed === PLACEHOLDER_PHRASE || words.every((w) => w === "PHRASE")) {
    return {
      isValid: true,
      isPlaceholder: true,
      isDangerous: false,
      message: "Phrase accepted for analysis.",
    };
  }

  // Check if it looks like a real seed phrase (12 or 24 words, many BIP-39 matches)
  const bip39Matches = words.filter((w) => BIP39_COMMON.has(w)).length;
  const bip39Ratio = bip39Matches / words.length;

  if ((words.length === 12 || words.length === 24) && bip39Ratio > 0.5) {
    return {
      isValid: true,
      isPlaceholder: true,
      isDangerous: false,
    };
  }

  if (words.length >= 8 && bip39Ratio > 0.6) {
    return {
      isValid: true,
      isPlaceholder: true,
      isDangerous: false,
      message:
        "Phrase accepted for analysis.",
    };
  }

  // Allow random non-dangerous input for research
  return {
    isValid: true,
    // isPlaceholder: false,
    isDangerous: false,
    message: "Input accepted (non-sensitive data).",
  };
}

export function getPlaceholderPhrase(): string {
  return PLACEHOLDER_PHRASE;
}
