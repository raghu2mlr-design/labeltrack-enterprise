// LabelTrack Encrypted Credential Vault Loader
// Cryptographically salted and hashed via SHA-256
// Compatible with local browser file protocol and Vercel CDN

window.__AUTH_VAULT__ = {
  "vault_version": "1.0-encrypted",
  "encryption_standard": "SHA-256-SALTED-VAULT",
  "description": "Encrypted credential repository for LabelTrack. Passwords are cryptographically salted and hashed. Plaintext passwords are not stored.",
  "updated_at": "2026-10-09T11:45:00Z",
  "users": [
    {
      "email": "admin@labeltrack.com",
      "role": "admin",
      "name": "Internal Operations Admin",
      "salt": "s4lt_adm_89f2a10",
      "password_hash": "49b8fe6a957eaac901b2d3a3e62485a1fd836f38aaffc1506b577527ad9dbda9"
    },
    {
      "email": "gate@labeltrack.com",
      "role": "gatekeeper",
      "name": "Gate Security Controller",
      "salt": "s4lt_gat_92d1b88",
      "password_hash": "e33d3cf043df11f2517443afc8b2a9cf5b48a2773d0bc4191c19e563acd0f37d"
    },
    {
      "email": "dispatch@apexprint.com",
      "role": "vendor",
      "vendorName": "Apex Print Ltd",
      "vendorCode": "VEN-01",
      "salt": "s4lt_apx_37c9b04",
      "password_hash": "36e92909ff2dd0f77b38ec438d2a0e6b089e98468e93ba8403d06d0161c8bcc2"
    },
    {
      "email": "dispatch@royalprinters.com",
      "role": "vendor",
      "vendorName": "Royal Roll Printers",
      "vendorCode": "VEN-02",
      "salt": "s4lt_ryl_61e5d92",
      "password_hash": "005420d010f6de4bccdc7bb67a52f1b6c8981fe317a896369b21a205fbd79287"
    },
    {
      "email": "ch.saipavan@rsbrothers.net",
      "role": "vendor",
      "vendorName": "pavan",
      "vendorCode": "VEN-03",
      "salt": "s4lt_v_tzgrwzoxdq",
      "password_hash": "31f71739667380e7215792dd5c9b5c99ef94d2bf2ec1ff9306208ac52ce36969"
    },
    {
      "email": "svl@gmail.com",
      "role": "vendor",
      "vendorName": "Sri Vigeneswara Labels",
      "vendorCode": "SVL",
      "salt": "s4lt_v_j65lk9rfta",
      "password_hash": "c5f950b9edeb66f9c935e78a258c39b917e63d8328afaf12228bba3f14195fd0"
    }
  ]
};
