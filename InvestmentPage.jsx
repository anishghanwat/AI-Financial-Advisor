import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function InvestmentPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div>
            <div className="navigation-controls">
                <button
                    className="back-button"
                    onClick={() => navigate('/budget')}
                >
                    ← {t('navigation.budget')}
                </button>
            </div>

            {/* Existing investment content */}
            {/* ... */}
        </div>
    );
}

export default InvestmentPage; 