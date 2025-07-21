import { useParams, useNavigate } from 'react-router-dom';
import { Select } from 'antd';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
];

export const LanguageSwitcher = () => {
  const { lang } = useParams();
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    navigate(`/${value}`);
  };

  return (
    <Select
      value={lang}
      onChange={handleChange}
      options={languages.map(({ code, label }) => ({
        value: code,
        label,
      }))}
      size="middle"
      className="w-[100px]"
      variant='outlined'
    />
  );
};
