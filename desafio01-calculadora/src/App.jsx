import { useState, useEffect } from 'react';
import { Container, Content, Row } from './styles.jsx';
import Input from './components/Input';
import Button from './components/Button';

function App() {
  const [num, setNum] = useState('0');
  const [operator, setOperator] = useState(null);
  const [previousNum, setPreviousNum] = useState(null);

  // ✅ Função principal
  const handleClick = (label) => {
    if (!isNaN(label)) {
      setNum((prev) => (prev === '0' ? label : `${prev}${label}`));
    } else if (label === '.') {
        setNum((prev) => {
          if (prev.includes('.')) return prev;
          if (prev === '' || prev === '0') return '0.';
          return prev + '.';
        });
    } else if (label === '%') {
      setNum((prev) =>{
        const current = parseFloat(prev);
        if (previousNum !== null && operator) {
          const percentage = previousNum * (current / 100);
          return percentage.toString();
        } else {
          return(current / 100).toString();
        }
      })
    }
     else if (label === '+' || label === '-' || label === '*' || label === '/') {
      setPreviousNum(Number(num));
      setOperator(label);
      setNum('');
    } else if (label === '=') {
      if (operator && previousNum !== null) {
        let result;
        switch (operator) {
          case '+':
            result = previousNum + Number(num);
            break;
          case '-':
            result = previousNum - Number(num);
            break;
          case '*':
            result = previousNum * Number(num);
            break;
          case '/':
            result = previousNum / Number(num);
            break;
          default:
            return;
        }
        setNum(result.toString());
        setOperator(null);
        setPreviousNum(null);
      }
    } else if (label === 'C' || label === 'CE') {
      setNum('0');
      setOperator(null);
      setPreviousNum(null);
    } else if (label === '+/-') {
      setNum((prev) => {
        if (prev.startsWith('-')) return prev.slice(1);
        if (prev === '0') return '-0';
        return `-${prev}`;
      });
    } 
  };

  // ✅ Captura tecla pressionada globalmente
  useEffect(() => {
    const handleKeyDown = (event) => {
      let key = event.key;

      // Mapear tecla Enter para '='
      if (key === 'Enter') key = '=';

      // Mapear multiplicação do teclado numérico
      if (key === 'x') key = '*';

      // Ignorar outras teclas
      const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','=','C','c','Backspace','Delete','Escape'];
      if (!allowedKeys.includes(key)) return;

      if (key === 'Backspace' || key === 'Delete' || key === 'Escape') {
        handleClick('C');
        return;
      }

      handleClick(key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [num, operator, previousNum]);

  return (
    <Container>
      <Content>
        <Input value={num} />
        <Row>
          <Button label="%" onClick={() => handleClick('%')} />
          <Button label="CE" onClick={() => handleClick('CE')} />
          <Button label="C" onClick={() => handleClick('C')} />
          <Button label="/" onClick={() => handleClick('/')} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleClick('7')} />
          <Button label="8" onClick={() => handleClick('8')} />
          <Button label="9" onClick={() => handleClick('9')} />
          <Button label="*" onClick={() => handleClick('*')} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleClick('4')} />
          <Button label="5" onClick={() => handleClick('5')} />
          <Button label="6" onClick={() => handleClick('6')} />
          <Button label="-" onClick={() => handleClick('-')} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleClick('1')} />
          <Button label="2" onClick={() => handleClick('2')} />
          <Button label="3" onClick={() => handleClick('3')} />
          <Button label="+" onClick={() => handleClick('+')} />
        </Row>
        <Row>
          <Button label="+/-" onClick={() => handleClick('+/-')} />
          <Button label="0" onClick={() => handleClick('0')} />
          <Button label="." onClick={() => handleClick('.')} />
          <Button label="=" onClick={() => handleClick('=')} />
        </Row>
      </Content>
    </Container>
  );
}

export default App;
