import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Sayfa Bulunamadı | Prof. Dr. İbrahim Etem Pişkin</title>
      </Helmet>
      <div className="not-found">
        <div className="not-found__icon">👶</div>
        <div className="not-found__code">404</div>
        <h1 className="not-found__title">Sayfa Bulunamadı</h1>
        <p className="not-found__desc">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek devam edebilirsiniz.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary btn--lg">Ana Sayfaya Dön</Link>
          <a href="tel:+908508118176" className="btn btn--outline btn--lg">Bizi Arayın</a>
        </div>
      </div>
    </>
  );
}
