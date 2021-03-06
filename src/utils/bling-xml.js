var js2xmlparser = require("js2xmlparser");

const xml = (name = 'Organisys Software test', won_time = '01/09/2009', value = 50) => {
    var obj = {
        pedido: {
            cliente: {
                nome: name,
                tipoPessoa: 'J',
                endereco: 'Rua Visconde de São Gabriel',
                cpf_cnpj: 'official_document',
                ie_rg: '3067663000',
                numero: '392',
                complemento: 'Sala 54',
                bairro: 'Cidade Alta',
                cep: '95.700-000',
                cidade: 'Bento Gonçalves',
                uf: 'RS',
                fone: '5481153376',
                email: 'teste@teste.com.br',
            },
            transporte: {
                transportadora: 'Transportadora XYZ',
                tipo_frete: 'R',
                servico_correios: 'SEDEX - CONTRATO',
                dados_etiqueta: {
                    nome: 'Endereço de entrega',
                    endereco: 'Rua Visconde de São Gabriel',
                    numero: '392',
                    complemento: 'Sala 59',
                    municipio: 'Bento Gonçalves',
                    uf: 'RS',
                    cep: '95.700-000',
                    bairro: 'Cidade Alta',
                },
                volumes: {
                    volumes: [
                        {
                            servico: 'SEDEX - CONTRATO',
                            codigoRastreamento: '',
                        },
                        {
                            servico: 'PAC - CONTRATO',
                            codigoRastreamento: '',
                        },
                    ],
                },
            },
            itens: {
                item: [
                    {
                        codigo: '1',
                        descricao: 'Won deal',
                        un: 'Pç',
                        qtde: '1',
                        vlr_unit: value,
                    }
                ],
            },
            parcelas: {
                parcela: [
                    {
                        data: won_time,
                        vlr: value,
                        obs: 'Teste obs 1',
                    },
    
                ],
            },
            vlr_frete: '15',
            vlr_desconto: '10',
            obs: 'Testando o campo observações do pedido',
            obs_internas: 'Testando o campo observações internas do pedido',
        },
    }
    return encodeURI(js2xmlparser.parse("person", obj))
}

module.exports = xml
 
// console.log(js2xmlparser.parse("person", obj));