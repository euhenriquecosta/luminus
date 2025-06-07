# DDD (Domain-driven Design)

Design dirigido à domínio.
O DDD é um método de design de software que visa modelar sistemas complexos através da identificação de domínios e subdomínios. Ele se baseia na identificação de conceitos e entidades que representam o problema a ser resolvido, e na criação de modelos que representam essas entidades e suas relações.

Design e como vamos converter o problema do cliente em código. Em algo palpavel.

# Domínio (Domain)

Área de entendimento, área de conhecimento. Onde todas as pessoas envolvidas na construção do software tem o conhecimento muito semelhante.

## Domain Experts
> Pessoas que tem conhecimento do problema que o cliente está tentando resolver. Pessoas que estão no dia a dia, lidando com o problema. E algo muito importante é a conversa. Várias conversas com vários experts de domínio, vai ser criado a linguagem ubíqua.

## Linguagem ubíqua
> Palavras que são usadas por todos os profissionais de domínio. Por exemplo no caso de uma clinica de estética, ela não vai chamar o cliente de cliente, e sim de paciente.

## Agregados (Aggregates)
> Um agregado é um conjunto de objetos associados que tratamos como uma unidade para propósito de mudanças de dados. Cada agregado possui uma raiz (aggregate root) e uma fronteira. A raiz é uma entidade específica contida na fronteira do agregado. Os objetos externos podem ter referências apenas para a raiz. A raiz pode manter referências para qualquer objeto dentro da fronteira e os objetos internos podem se referir uns aos outros.

## Value Objects
> São objetos que não possuem identidade própria, são imutáveis e sempre válidos. Eles são definidos apenas por seus atributos. Por exemplo, um endereço pode ser um Value Object, pois não importa qual instância específica estamos usando, desde que os valores (rua, número, etc.) sejam os mesmos.

## Eventos de Domínio (Domain Events)
> São objetos que representam algo significativo que aconteceu no domínio. Eles capturam mudanças no estado do sistema e podem disparar outros processos. Por exemplo, quando um pedido é aprovado, um evento "PedidoAprovado" pode ser gerado, levando a outras ações como notificação do cliente ou início do processo de envio.

## Subdomínio (Bounded Contexts)
> É uma fronteira explícita dentro da qual um modelo de domínio específico é definido e aplicável. Cada contexto delimitado tem sua própria linguagem ubíqua e pode implementar os mesmos conceitos de maneira diferente de outros contextos.

## Entidades
> São objetos que possuem uma identidade única que permanece a mesma ao longo do tempo, mesmo que seus atributos mudem. Por exemplo, um cliente é uma entidade, pois mesmo que seu nome ou endereço mude, continua sendo o mesmo cliente.

## Casos de uso
> Representam as operações ou ações que podem ser executadas no sistema. Eles encapsulam a lógica de negócio e coordenam as entidades e objetos de valor para realizar uma tarefa específica.

## Serviços
> Quando uma operação não pertence naturalmente a nenhuma entidade ou objeto de valor, ela pode ser modelada como um serviço. Serviços são operações sem estado que realizam uma tarefa específica do domínio.

## Repositórios
> São responsáveis por gerenciar o ciclo de vida das entidades, fornecendo uma interface entre o domínio e a camada de dados. Eles encapsulam a lógica necessária para persistir e recuperar objetos.

## Infraestrutura
> Fornece capacidades técnicas que suportam as camadas superiores, como persistência de dados, mensageria, logging, etc. É a camada mais externa da aplicação.

## Aplicação
> Coordena os objetos do domínio para realizar tarefas. Não contém regras de negócio, mas orquestra os objetos do domínio que contêm as regras.

## Interface
> Responsável pela apresentação de informações ao usuário e interpretação dos comandos do usuário. Pode ser uma interface gráfica, API REST, linha de comando, etc.

