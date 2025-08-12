import logo from '../../assets/logo.png';

export default function Footer() {
  return (

    <footer className="d-flex flex-wrap align-items-center py-3 my-4 border-top" style={{background: '#f8f9fa', padding: '1.5rem'}}>
      <p className="col-md-4 mb-0 text-muted">© {new Date().getFullYear()} Swag Mountain</p>

      <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <img src={logo} style={{width: 150, height: 150}}/>
      </a>

      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Sale</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Blog</a></li>
      </ul>
    </footer>
  );
}