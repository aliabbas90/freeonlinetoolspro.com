"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const categories = [
  "Vehicules", "Immobilier", "Multimedia", "Maison", "Loisirs",
  "Mode", "Materiel professionnel", "Emploi", "Services", "Autre",
];

const conditions = [
  "Neuf", "Tres bon etat", "Bon etat", "Etat correct", "Pour pieces",
];

export default function AnnonceGeneratorPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Autre");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Tres bon etat");
  const [location, setLocation] = useState("");

  // Checkboxes
  const [negociable, setNegociable] = useState(false);
  const [prixFerme, setPrixFerme] = useState(false);
  const [echange, setEchange] = useState(false);
  const [livraison, setLivraison] = useState(false);
  const [mainPropre, setMainPropre] = useState(true);
  const [nonSerieux, setNonSerieux] = useState(true);
  const [fumeur, setFumeur] = useState(false);
  const [animal, setAnimal] = useState(false);
  const [facture, setFacture] = useState(false);
  const [garantie, setGarantie] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [lot, setLot] = useState(false);

  const [copied, setCopied] = useState(false);

  const generateAnnonce = () => {
    let annonce = "";

    // Title
    if (title) {
      annonce += `${title.toUpperCase()}\n\n`;
    }

    // Category & Condition
    annonce += `📦 Categorie : ${category}\n`;
    annonce += `✅ Etat : ${condition}\n`;
    if (location) annonce += `📍 Localisation : ${location}\n`;
    annonce += "\n";

    // Price
    if (price) {
      annonce += `💰 Prix : ${price} €`;
      if (negociable) annonce += " (negociable)";
      if (prixFerme) annonce += " (prix ferme, non negociable)";
      annonce += "\n\n";
    }

    // Description
    if (description) {
      annonce += `📝 Description :\n${description}\n\n`;
    }

    // Details
    const details: string[] = [];
    if (echange) details.push("✅ Echange possible");
    if (livraison) details.push("📦 Livraison possible");
    if (mainPropre) details.push("🤝 Remise en main propre");
    if (facture) details.push("🧾 Facture disponible");
    if (garantie) details.push("🛡️ Sous garantie");
    if (lot) details.push("📦 Vente en lot possible");
    if (!fumeur) details.push("🚭 Environnement non-fumeur");
    if (!animal) details.push("🐾 Pas d'animaux");
    if (urgent) details.push("⚡ URGENT - A vendre rapidement");

    if (details.length > 0) {
      annonce += details.join("\n") + "\n\n";
    }

    // Footer
    annonce += "---\n";
    if (nonSerieux) annonce += "⚠️ Non serieux s'abstenir.\n";
    annonce += "📩 N'hesitez pas a me contacter pour plus d'informations.\n";
    annonce += "📸 D'autres photos disponibles sur demande.";

    return annonce;
  };

  const annonce = generateAnnonce();

  const copy = () => {
    navigator.clipboard.writeText(annonce);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checkboxClass = (checked: boolean) =>
    `flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
      checked
        ? "border-indigo-500/50 bg-indigo-500/10 text-gray-100"
        : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20"
    }`;

  return (
    <ToolLayout
      title="Generateur d'Annonce Gratuit"
      description="Creez des annonces parfaites pour Leboncoin, Vinted, Facebook Marketplace. Copiez en un clic."
    >
      <div className="space-y-6">
        {/* Platforms */}
        <div className="flex gap-3 justify-center text-sm text-gray-400">
          <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">Leboncoin</span>
          <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Vinted</span>
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Marketplace</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Titre de l&apos;annonce *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ex: iPhone 15 Pro Max 256Go"
                className="w-full p-3 border border-white/10 rounded-xl text-gray-100 bg-gray-900 placeholder-gray-600 outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Categorie</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-white/10 rounded-xl text-gray-100 bg-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Etat</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full p-3 border border-white/10 rounded-xl text-gray-100 bg-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  {conditions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Prix (€)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="150"
                  className="w-full p-3 border border-white/10 rounded-xl text-gray-100 bg-gray-900 placeholder-gray-600 outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Localisation</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Paris 75001"
                  className="w-full p-3 border border-white/10 rounded-xl text-gray-100 bg-gray-900 placeholder-gray-600 outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Decrivez votre article en detail : marque, modele, taille, couleur, raison de la vente..."
                rows={4}
                className="w-full p-3 border border-white/10 rounded-xl text-gray-100 bg-gray-900 placeholder-gray-600 resize-none outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            {/* Checkboxes */}
            <div>
              <label className="block text-sm text-gray-400 mb-3">Options du prix</label>
              <div className="grid grid-cols-2 gap-2">
                <label className={checkboxClass(negociable)}>
                  <input type="checkbox" checked={negociable} onChange={(e) => { setNegociable(e.target.checked); if (e.target.checked) setPrixFerme(false); }} className="rounded" />
                  <span className="text-sm">💬 Negociable</span>
                </label>
                <label className={checkboxClass(prixFerme)}>
                  <input type="checkbox" checked={prixFerme} onChange={(e) => { setPrixFerme(e.target.checked); if (e.target.checked) setNegociable(false); }} className="rounded" />
                  <span className="text-sm">🔒 Prix ferme</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-3">Options de remise</label>
              <div className="grid grid-cols-2 gap-2">
                <label className={checkboxClass(mainPropre)}>
                  <input type="checkbox" checked={mainPropre} onChange={(e) => setMainPropre(e.target.checked)} className="rounded" />
                  <span className="text-sm">🤝 Main propre</span>
                </label>
                <label className={checkboxClass(livraison)}>
                  <input type="checkbox" checked={livraison} onChange={(e) => setLivraison(e.target.checked)} className="rounded" />
                  <span className="text-sm">📦 Livraison</span>
                </label>
                <label className={checkboxClass(echange)}>
                  <input type="checkbox" checked={echange} onChange={(e) => setEchange(e.target.checked)} className="rounded" />
                  <span className="text-sm">🔄 Echange possible</span>
                </label>
                <label className={checkboxClass(lot)}>
                  <input type="checkbox" checked={lot} onChange={(e) => setLot(e.target.checked)} className="rounded" />
                  <span className="text-sm">📦 Vente en lot</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-3">Informations supplementaires</label>
              <div className="grid grid-cols-2 gap-2">
                <label className={checkboxClass(facture)}>
                  <input type="checkbox" checked={facture} onChange={(e) => setFacture(e.target.checked)} className="rounded" />
                  <span className="text-sm">🧾 Facture</span>
                </label>
                <label className={checkboxClass(garantie)}>
                  <input type="checkbox" checked={garantie} onChange={(e) => setGarantie(e.target.checked)} className="rounded" />
                  <span className="text-sm">🛡️ Garantie</span>
                </label>
                <label className={checkboxClass(!fumeur)}>
                  <input type="checkbox" checked={!fumeur} onChange={(e) => setFumeur(!e.target.checked)} className="rounded" />
                  <span className="text-sm">🚭 Non-fumeur</span>
                </label>
                <label className={checkboxClass(!animal)}>
                  <input type="checkbox" checked={!animal} onChange={(e) => setAnimal(!e.target.checked)} className="rounded" />
                  <span className="text-sm">🐾 Sans animaux</span>
                </label>
                <label className={checkboxClass(nonSerieux)}>
                  <input type="checkbox" checked={nonSerieux} onChange={(e) => setNonSerieux(e.target.checked)} className="rounded" />
                  <span className="text-sm">⚠️ Non serieux s&apos;abstenir</span>
                </label>
                <label className={checkboxClass(urgent)}>
                  <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="rounded" />
                  <span className="text-sm">⚡ Urgent</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right - Preview */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-400">Apercu de l&apos;annonce</label>
              <button
                onClick={copy}
                className="text-sm text-indigo-400 hover:text-indigo-300 font-medium"
              >
                {copied ? "Copie !" : "Copier"}
              </button>
            </div>
            <div className="p-5 bg-gray-900 border border-white/10 rounded-xl text-gray-200 whitespace-pre-wrap leading-relaxed text-sm min-h-[400px] font-mono">
              {annonce}
            </div>
            <button
              onClick={copy}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all text-lg shadow-lg shadow-indigo-500/20"
            >
              {copied ? "Annonce copiee !" : "Copier l'annonce"}
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
