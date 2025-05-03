const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = process.env.PORT || 3000;



// Supabase-Konfiguration (Ersetze durch deine Daten)
const SUPABASE_URL = 'https://fvxqjfqgluvawikhrhsl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2eHFqZnFnbHV2YXdpa2hyaHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNjM1ODcsImV4cCI6MjA2MTgzOTU4N30.Ro18_oxAOSDSKKFiLpcGeXZJ1p_g6BHiHJ01jI8XfVg';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Middleware
app.use(express.json());
app.use(express.static('public')); // Für statische Dateien wie HTML, CSS, JS

// API-Routen
app.get('/episodes', async (req, res) => {
  try {
    const { data, error } = await supabase.from('episodes').select();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Episode hinzufügen
app.post('/episodes', async (req, res) => {
  const { name, story } = req.body;
  try {
    const { error } = await supabase.from('episodes').insert([{ name, story }]);
    if (error) throw error;
    res.status(200).send({ message: 'Episode gespeichert!' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Episode bearbeiten
app.put('/episodes/:id', async (req, res) => {
    const { name, story } = req.body;
    const { id } = req.params;
  
    try {
      const { error } = await supabase.from('episodes').update({ name, story }).eq('id', id);
      if (error) throw error;
      res.status(200).send({ message: 'Episode aktualisiert!' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});
  
// Episode löschen
app.delete('/episodes/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const { error } = await supabase.from('episodes').delete().eq('id', id);
      if (error) throw error;
      res.status(200).send({ message: 'Episode gelöscht!' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});


// API-Routen für Charaktere
// Alle Charaktere abrufen
// Einzelnen Charakter abrufen

// Alle Charaktere abrufen
app.get('/characters', async (req, res) => {
    try {
      const { data, error } = await supabase.from('characters').select();
      if (error) throw error;
      res.json(data);  // Sende die Liste der Charaktere als JSON zurück
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
app.post('/characters', async (req, res) => {
    console.log('Empfangene Daten:', req.body); // Ausgabe der empfangenen Daten
    const { image_url, name, age, biography, traits, strength, relationships, music, art_link } = req.body;
    try {
      const { error } = await supabase.from('characters').insert([{
        image_url, name, age, biography, traits, strength, relationships, music, art_link
      }]);
      if (error) throw error;
      res.status(200).send({ message: 'Charakter gespeichert!' });
    } catch (err) {
      console.error('Fehler beim Speichern:', err.message); // Fehlerprotokollierung
      res.status(500).send({ error: err.message });
    }
  });
  
  
  

  
  // Charakter bearbeiten

  // Charakter bearbeiten
app.put('/characters/:id', async (req, res) => {
    const { id } = req.params;
    const { image_url, name, age, biography, traits, strength, relationships, music, art_link } = req.body;
  
    try {
      const { error } = await supabase.from('characters').update({
        image_url, name, age, biography, traits, strength, relationships, music, art_link
      }).eq('id', id);
  
      if (error) throw error;
  
      res.status(200).send({ message: 'Charakter aktualisiert!' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  

// Charakter bearbeiten


  
  // Charakter löschen
  app.delete('/characters/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const { error } = await supabase.from('characters').delete().eq('id', id);
      if (error) throw error;
      res.status(200).send({ message: 'Charakter gelöscht!' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

  



  

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
