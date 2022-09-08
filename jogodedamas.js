const tamCel = 40;
let pecaId = 0;
let lf = 0;
let la = 0;
let c = "";
document.body.append(criarTab());

function criarTab() {
    const tamanho = 8;
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';

    for (let i = 0; i < tamanho; i++) {
        let linha = document.createElement('tr');
		
        tabela.append(linha);
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement('td');
			celula.setAttribute('id', i);
            linha.append(celula);
            celula.style.width = `${tamCel}px`;
            celula.style.height = `${tamCel}px`;
			pecaId += 1;
            if (i % 2 == j % 2) {
                celula.style.backgroundColor = 'black';
				celula.setAttribute("class","droptarget");
                if (i * 8 + j <= 24) {
                    celula.append(criarPeca('black',pecaId));
                } else if (i * 8 + j >= 40) {
                    celula.append(criarPeca('red',pecaId));
                }
            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    }
    return tabela;
}

function criarPeca(cor,ws) {
    let imagem = document.createElement('img');
		imagem.setAttribute('src', `${cor}.png`);
		imagem.setAttribute('width', `${tamCel-4}px`);
		imagem.setAttribute('height', `${tamCel-4}px`);
		imagem.setAttribute('draggable','true');
		imagem.setAttribute('id', ws);
		imagem.setAttribute('class', cor);
    return imagem;
}

function drag1(){
	document.addEventListener("drag1", function(event) {
	  event.dataTransfer.setData("Text", event.target.id);
	  la = event.path[1].id;
	  c = event.path[0].className;
	  
	});
}

function drag2() {
	document.addEventListener("drag2", function(event) {
	});
}

function drag3() {
	document.addEventListener("drag3", function(event) {
	  event.preventDefault();
	});
}
function drop(){
	document.addEventListener("drop", function(event) {
		event.preventDefault();
		if ( event.target.className == "droptarget") {
			const data = event.dataTransfer.getData("Text");
				let w = event.path[0];
				let e = w.childElementCount;
				lf = event.target.id;
				console.log(event)
				if(e == '0' && la != lf && lf - la == 1 || lf - la == -1){
					if(c == "red" && la > lf || c == "black" && la < lf)
					event.target.appendChild(document.getElementById(data));
				}
		}
	});
}

drag1();
drag2();
drag3();
drop();
