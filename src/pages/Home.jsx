import React from 'react'
import Connex from '@vechain/connex'
import "antd/dist/antd";
import { useEffect, useState } from "react";
import { Row, Col, Input, Table } from "antd"
import Footer from './Footer'
import { ethers } from '@vechain/ethers';

const connex = new Connex({
  node: 'https://mainnet.veblocks.net',
  network: 'main'
})

const nfts = [
  {"id":1,"name":"vekings","title":"VeKings","creator":"VeSea","banner":"images\/vekings-banner.webp","marketplace":"vesea","nftAddress":"0x148442103eeADFAF8Cffd593Db80DCDeAddA71C9"},
  {"id":2,"name":"vumanoids","title":"Vumanoids","creator":"Virgo","banner":"images\/vumanoids-banner.webp","marketplace":"vesea","nftAddress":"0x46db08ca72b205a8f9e746a9e33a30d2f379216b"},
  {"id":3,"name":"vales","title":"Vales","creator":"Virgo","banner":"images\/vales-banner.webp","marketplace":"vesea","nftAddress":"0xa2c82ad2841c23a49fc2ba1a23927d1fe835c7f9"},
  {"id":4,"name":"universe","title":"Universe","creator":"Jason Wisco\u24cbitch","banner":"images\/universe-banner.webp","marketplace":"vesea","nftAddress":"0x60deca6baceb6258c8d718f9987acb17176f7f24"},
  {"id":5,"name":"astrovets","title":"AstroVets","creator":"AstroVets","banner":"images\/astrovets-banner.webp","marketplace":"vesea","nftAddress":"0x436f0a9b45e85eb2f749aa67d3393c649ef4dff2"},
  {"id":6,"name":"mad_vapes","title":"Mad V-Apes","creator":"Mad \u24cb-Apes","banner":"images\/mad-v-apes-banner.webp","marketplace":"vesea","nftAddress":"0xffcc1c4492c3b49825712e9a8909e4fcebfe6c02"},
  {"id":7,"name":"mad_vapes_fusion","title":"Mad V-Apes Fusion","creator":"Mad \u24cb-Apes","banner":"images\/mad-v-apes-fusion-banner.webp","marketplace":"vesea","nftAddress":"0xb12d1d640f56173ef3a47e5e1a1fde96ba96ce14"},
  {"id":8,"name":"vekongs","title":"VeKongs","creator":"VeKongs","banner":"images\/vekongs-banner.webp","marketplace":"vesea","nftAddress":"0x9932690b32c4c0cd4d86a53eca948d33b1556ae7"},
  {"id":9,"name":"new_pigs_order","title":"New Pigs Order","creator":"New Pigs Order","banner":"images\/new-pigs-order-banner.webp","marketplace":"vesea","nftAddress":"0x88D7E38aF5bdB6E65a045c79c9cE70Ed06e6569B"},
  {"id":10,"name":"vegnomes","title":"VeGnomes","creator":"Jeff Perry","banner":"images\/vegnomes-banner.webp","marketplace":"vesea","nftAddress":"0x15e2F18FeADE6ccB990956050bf0c2990445cACe"},
  {"id":11,"name":"veloot","title":"veLoot","creator":"veLoot","banner":"images\/veloot-banner.webp","marketplace":"vesea","nftAddress":"0x1f173256C08E557D0791BC6EF2aC1b1099F57Ed5"},
  {"id":12,"name":"guardians","title":"Guardians","creator":"VictuhVictuh","banner":"images\/guardians-banner.webp","marketplace":"vesea","nftAddress":"0x7f2445324B9aaAEDe83A0Bde18a1D55caeA8c18f"},
  {"id":13,"name":"vethugs","title":"VeThugs","creator":"BVM","banner":"images\/vethugs-banner.webp","marketplace":"blackvemarket","nftAddress":"0x97F7C8d476183b69f18f810a18baf3f79994a267"},
  {"id":14,"name":"vlippos","title":"Vlippos","creator":"Vlippos","banner":"images\/vlippos-banner.webp","marketplace":"blackvemarket","nftAddress":"0x81FC139f676736c96cbcBA40b5E5229BaEC02732"},
  {"id":15,"name":"no_nerds_inc","title":"No Nerds Inc","creator":"No Nerds Inc","banner":"images\/no-nerd-inc-banner.webp","marketplace":"blackvemarket","nftAddress":"0x77FE6041fA5beb0172C9aB6014b4D8d5099F0A23"},
  {"id":16,"name":"metaversials","title":"Metaversials","creator":"Pizzu","banner":"images\/metaversials-banner.webp","marketplace":"vesea","nftAddress":"0x313d1fFf2664A2df5A12E99c8C57E50eFA715d73"},
  {"id":17,"name":"vemons","title":"Vemons","creator":"FingaBang","banner":"images\/vemons-banner.webp","marketplace":"blackvemarket","nftAddress":"0x3dBBa9AD9E33bd188EEe8aa2d5c0e7B9894c6209"},
  {"id":19,"name":"veeparrots","title":"VeeParrots","creator":"VeeParrots","banner":"images\/veeparrots-banner.webp","marketplace":"vesea","nftAddress":"0x4E4fAEBF70E7c01Bcd39ADbfaa247f081819919a"},
  {"id":20,"name":"bannerboi","title":"Bannerboi","creator":"Zima :'(","banner":"images\/bannerboi-banner.webp","marketplace":"blackvemarket","nftAddress":"0x4523048daA77b61766aDD0bEBF7f83E05F173d8F"},
  {"id":21,"name":"vfoxes","title":"VFoxes","creator":"NO\u042fDES","banner":"images\/vfoxes-banner.webp","marketplace":"vesea","nftAddress":"0x78D4bA28C151501fa3f68927eA96304cAb89B6F0"},
  {"id":22,"name":"veshawties","title":"Veshawties","creator":"BVM","banner":"images\/veshawties-banner.webp","marketplace":"blackvemarket","nftAddress":"0xD56340abB721b7c89C6CA3835EFc490dFd66F9Ae"},
  {"id":24,"name":"mad_vapes_elementals","title":"Mad V-Apes Elementals","creator":"Mad \u24cb-Apes","banner":"images\/mad-v-apes-elemental-banner.webp","marketplace":"vesea","nftAddress":"0xd861BE8e33ebd09764BfcA242ca6a8c54dcf844A"},
  {"id":25,"name":"guardians_team_leaders","title":"Guardians - Team Leaders","creator":"VictuhVictuh","banner":"images\/guardians-team-leaders-banner.webp","marketplace":"vesea","nftAddress":"0xd393c0dcccaE49248862b462404b63a8546a888A"},
  {"id":26,"name":"metaversials_alteregos","title":"Metaversials Alter-egos","creator":"Pizzu","banner":"images\/metaversials-alter-egos-banner.webp","marketplace":"vesea","nftAddress":"0x055Faf8495067864bCb8e8e3eDAdc506D98aF5b3"},
  {"id":27,"name":"universe_expanse","title":"Uni\u24cberse - The Expanse","creator":"Jason Wisco\u24cbitch","banner":"images\/universe-expanse-banner.webp","marketplace":"vesea","nftAddress":"0x207577649f08C87de98E9981712fc9Aece07Df79"},
  {"id":28,"name":"undead_vekings","title":"Undead VeKings","creator":"VeSea","banner":"images\/undead-vekings-banner.webp","marketplace":"vesea","nftAddress":"0x6f0d98490d57a0b2b3f44342edb6a5bb30012e1c"},
  {"id":30,"name":"sacrificed_vekings","title":"Sacrificed VeKings","creator":"VeSea","banner":"images\/sacrificed-vekings-banner.webp","marketplace":"vesea","nftAddress":"0x8b55d319b6cae4b9fd0b4517f29cf4a100818e38"},
  {"id":31,"name":"frost_giant_vekings","title":"Frost Giant VeKings","creator":"VeSea","banner":"images\/frost-giant-vekings-banner.webp","marketplace":"vesea","nftAddress":"0x3427e769ae440ae8e18b77f49cc2d6a39e57f047"},
  {"id":32,"name":"veghosts","title":"VeGhosts","creator":"Virtual Flame Studios","banner":"images\/veghosts-banner.webp","marketplace":"vesea","nftAddress":"0x588f2b0d4cbea48deb34c3d401cb995046edda81"},
  {"id":33,"name":"veysarum","title":"Veysarum","creator":"Data","banner":"images\/veysarum-banner.webp","marketplace":"vesea","nftAddress":"0x9992501f1ef16d4b900e9d316cf468959b8f9bcd"},
  {"id":34,"name":"venerds","title":"VeNerds","creator":"Virtual Flame Studios","banner":"images\/venerds-banner.webp","marketplace":"vesea","nftAddress":"0x14c7d5357da8a8ed7a3983bc5ffd249fee63192d"},
  {"id":35,"name":"ukraine_relief","title":"Ukraine Relief","creator":"VeSea","banner":"images\/ukraine-banner.webp","marketplace":"vesea","nftAddress":"0x850a2457975fD411f03a513c6f94Cd7D378E7Ec1"},
  {"id":36,"name":"venerds_airdrops","title":"VeNerds Airdrops","creator":"Virtual Flame Studios","banner":"images\/venerds-airdrops-banner.webp","marketplace":"vesea","nftAddress":"0x5452c80cdfd31e175f62f6197e65adaf73ec84df"},
  {"id":37,"name":"galaxy","title":"Galaxy Portraits","creator":"Ben","banner":"images\/galaxy-banner.webp","marketplace":"vesea","nftAddress":"0xc35d04f8783f85ede2f329eed3c1e8b036223a06"},
  {"id":38,"name":"veskullz","title":"VeSkullz","creator":"defeckz","banner":"images\/veskullz-banner.webp","marketplace":"vesea","nftAddress":"0x01c10830feef88258e7a1ca998009ac19f7f087e"},
  {"id":39,"name":"victs","title":"Victs","creator":"VeWarden","banner":"images\/victs-banner.webp","marketplace":"vesea","nftAddress":"0xC2dE1fbB24d918a68923CFb24cC541aEA7a49450"},
  {"id":40,"name":"veabstract","title":"VeAbstract","creator":"Arion Friddle","banner":"images\/veabstract-banner.webp","marketplace":"vesea","nftAddress":"0x64E8f785C27Fb1F55F6Ef38787853D3a1d0cdE02"},
  {"id":41,"name":"venature","title":"VeNature","creator":"Ferriolsc","banner":"images\/venature-banner.webp","marketplace":"vesea","nftAddress":"0xbcFc59dcC2A0977Ac1e9B465566Ad071e5eC06Aa"},
  {"id":42,"name":"ukiyoe_warriors","title":"Ukiyoe Warriors","creator":"Airworthy","banner":"images\/ukiyou-warriors-banner.webp","marketplace":"vesea","nftAddress":"0xb14baed957b8e58db10ec5ef37927d83b3bbf297"},
  {"id":43,"name":"doppelganger","title":"Doppelganger","creator":"Paolo Di Medici","banner":"images\/doppelganger-banner.webp","marketplace":"vesea","nftAddress":"0x2571978545672Fe7e4CCed7409BDd0A57Bc3C3D2"},
  {"id":44,"name":"bored_flamingo_flying_club","title":"Bored Flamingo Flying Club","creator":"Bored Flamingo","banner":"images\/bored-flamingo-flying-club-banner.webp","marketplace":"vesea","nftAddress":"0xa723a21419181a9ddee6e3981d5854a05c9e90e1"},
  {"id":45,"name":"exoworlds","title":"ExoWorlds","creator":"ExoWorlds","banner":"images\/exoworlds-banner.webp","marketplace":"vesea","nftAddress":"0x3473c5282057d7beda96c1ce0fe708e890764009"},
  {"id":46,"name":"new_pigs_order_slaughterhouse","title":"New Pigs Order - Slaughterhouse","creator":"New Pigs Order","banner":"images\/new-pigs-order-slaughterhouse-banner.webp","marketplace":"vesea","nftAddress":"0xBC0447E063F00A6d43d9BB3C60380A86498d6E64"},
  {"id":47,"name":"forest_nation_keepers","title":"Forest Nation - Keepers","creator":"Forest Nation","banner":"images\/forest-nation-keepers-banner.webp","marketplace":"vesea","nftAddress":"0xF60b9Aa0Ab640C23B6DD6456A15d041A5F3a5F5E"},
  {"id":48,"name":"union_membership","title":"Union Membership","creator":"No Nerds Inc","banner":"images\/union-membership.webp","marketplace":"blackvemarket","nftAddress":"0x2f478c2e68e3385e632C625F0ee12D5a3A775e68"},
  {"id":49,"name":"metatun","title":"Metatun","creator":"Metatun","banner":"images\/metatun-banner.webp","marketplace":"vesea","nftAddress":"0xd6b93818ac38c936f51538e5e7832d7127b79622"},
  {"id":50,"name":"shredderz","title":"Shredderz","creator":"Virtual Flame Studios","banner":"images\/shredderz-banner.webp","marketplace":"vesea","nftAddress":"0x167F6Cc1e67a615b51B5a2dEABA6b9FEca7069dF"},
  {"id":51,"name":"vogies","title":"Vogies","creator":"Vogies","banner":"images\/vogies-banner.webp","marketplace":"blackvemarket","nftAddress":"0x4A6B084243762dc219480Edc5cFa0d88298BB707"},
  {"id":52,"name":"dos_eggs","title":"DoS Eggs","creator":"DoS","banner":"images\/dos-eggs-banner.webp","marketplace":"blackvemarket","nftAddress":"0xd6b546368087d82a230a561c777ca74776a1bb0c"},
  {"id":53,"name":"bullys","title":"Bullys","creator":"Bullys","banner":"images\/bullys-banner.webp","marketplace":"blackvemarket","nftAddress":"0xc9c8964cf25d2c738190f74b8508cdfac8650b9d"},
  {"id":54,"name":"forest_nation_guardians","title":"Forest Nation - Guardians","creator":"Forest Nation","banner":"images\/forest-nation-guardians-banner.webp","marketplace":"vesea","nftAddress":"0x1d971ac972f671c19d1be00e4fbf3118d3861851"},
  {"id":55,"name":"psycho_beasts","title":"PsychoBeasts","creator":"PsychoBeasts","banner":"images\/psycho-beasts-banner.webp","marketplace":"vesea","nftAddress":"0xf19fE0F222e4f2a7587B817042FE58f4f330A009"},
  {"id":56,"name":"kickback_koalas","title":"Kickback Koalas","creator":"Kickback Koalas","banner":"images\/kickback-koalas-banner.webp","marketplace":"vesea","nftAddress":"0x3759080B28604fd2851c215Da71539bD8D5242Ef"},
  {"id":57,"name":"warbands","title":"Warbands","creator":"Warbands","banner":"images\/warbands-banner.webp","marketplace":"vesea","nftAddress":"0x6aa982158617d53c37f65d43eb9a156449adfff3"},
  {"id":58,"name":"nft_paper_project","title":"NFT Paper Project","creator":"Emmet","banner":"images\/nftpp-banner.webp","marketplace":"vesea","nftAddress":"0x04eDC606B0D60e843528422619C6d939be8a2fcF"},
  {"id":59,"name":"mad_vapes_phoenix","title":"Mad V-Apes Phoenix","creator":"Mad \u24cb-Apes","banner":"images\/mad-v-apes-phoenix-banner.webp","marketplace":"vesea","nftAddress":"0x73f32592df5c0da73d56f34669d4ae28ae1afd9e"},
  {"id":60,"name":"vfoxes_origins","title":"VFox Alliance - ORIGINS","creator":"NO\u042fDES","banner":"images\/vfoxes-origins-banner.webp","marketplace":"vesea","nftAddress":"0x3fDf191152684B417F4A55264158c2eab97a81b3"},
  {"id":61,"name":"ukiyoe_yokai","title":"Ukiyoe Yokai","creator":"Airworthy","banner":"images\/ukiyoe-yokai-banner.webp","marketplace":"vesea","nftAddress":"0xf92b2a2ff63ff09933c0ae797eff594ea3498c81"},
  {"id":62,"name":"bored_flamingo_flying_club_ladies","title":"Bored Flamingo Flying Club Ladies","creator":"Bored Flamingo","banner":"images\/bored-flamingo-flying-club-ladies-banner.webp","marketplace":"vesea","nftAddress":"0x41a03b04725c20f3902c67ee7416e5df4266df45"},
  {"id":63,"name":"yeet_crusaders","title":"Yeet Crusaders","creator":"yeetCrusader","banner":"images\/yeet-crusaders-banner.webp","marketplace":"vesea","nftAddress":"0x47cce813c986b4d982a192bf7d6831f4beaccbc0"},
  {"id":64,"name":"dos_baby_dragons","title":"DoS Baby Dragons","creator":"DoS","banner":"images\/dos-baby-dragons-banner.webp","marketplace":"blackvemarket","nftAddress":"0xC22D8cA65Bb9EE4A8b64406f3B0405CC1EbeEc4e"},
  {"id":65,"name":"inka_empire","title":"Inka Empire","creator":"Llama Digital Studios","banner":"images\/inka-empire-banner.webp","marketplace":"vesea","nftAddress":"0x910607db19dce5651da4e68950705d6e49bc01a5"},
  {"id":66,"name":"vecorgi_gang","title":"VeCorgiGang","creator":"VeCorgi","banner":"images\/vecorgi-gang-banner.webp","marketplace":"vesea","nftAddress":"0xa4bf5a32d0f1d1655eec3297023fd2136bd760a2"},
  {"id":67,"name":"mino_mob_elixirs","title":"Mino Mob Elixirs","creator":"Mino Mob","banner":"images\/mino-mob-elixirs-banner.webp","marketplace":"vesea","nftAddress":"0x862b1cb1c75ca2e2529110a9d43564bd5cd83828"},
  {"id":68,"name":"shamanic_oracles","title":"Shamanic Oracles","creator":"Safe Haven (SHA)","banner":"images\/shamanic-oracles-banner.webp","marketplace":"vesea","nftAddress":"0xda878be46f4a6ec013340fb985231ed67eb712d3"},
  {"id":69,"name":"shamanic_companions","title":"Shamanic Companions","creator":"Safe Haven (SHA)","banner":"images\/shamanic-companions-banner.webp","marketplace":"vesea","nftAddress":"0x7de7c8d9c4cd487b73df58b2a6b9302446f4e116"},
  {"id":70,"name":"vvarriors","title":"VVarriors","creator":"VVarriors","banner":"images\/vvarriors-banner.webp","marketplace":"vesea","nftAddress":"0x499be5332bfba0761650ae55b8d9c8443458f219"},
  {"id":71,"name":"vereapers","title":"VeReapers","creator":"VeReapers","banner":"images\/vereapers-banner.webp","marketplace":"vesea","nftAddress":"0xB59AeA40B5d6946C0b593321318985d0d0bc66c0"},
  {"id":72,"name":"mino_mob","title":"Mino Mob","creator":"Mino Mob","banner":"images\/minomob-banner.webp","marketplace":"vesea","nftAddress":"0xf4d82631be350c37d92ee816c2bd4d5adf9e6493"},
  {"id":73,"name":"ratverse_genesis","title":"Ratverse Genesis","creator":"Ratverse","banner":"images\/ratverse-genesis-banner.webp","marketplace":"vesea","nftAddress":"0x1427D0D3233e39A9703eEcDca251Da771E9971A7"},
  {"id":74,"name":"phantom_veghosts","title":"Phantom VeGhosts","creator":"VeGhosts","banner":"images\/phantom-veghosts-banner.webp","marketplace":"vesea","nftAddress":"0x875d36b9760ffe7ce366d3ff700c1ad98bdee990"},
  {"id":75,"name":"smuzzies_phantom_veghosts","title":"Smuzzies Phantom VeGhosts","creator":"VeGhosts","banner":"images\/smuzzies-phantom-veghosts-banner.webp","marketplace":"vesea","nftAddress":"0x0504448A67074e2977723B5d19A3467C5DbABB82"},
  {"id":76,"name":"vvardogs","title":"VVAR DOGS","creator":"VVAR DOGS","banner":"images\/vvardogs-banner.webp","marketplace":"vesea","nftAddress":"0xB757fC0906F08714315D2aBD4B4f077521A21e34"},
  {"id":77,"name":"venonymous","title":"Venonymous","creator":"Venonymous","banner":"images\/venonymous-banner.webp","marketplace":"blackvemarket","nftAddress":"0x2fd3d1e1a3f1e072c89d67301a86a5ba850ccd4e"},
  {"id":78,"name":"ratverse_x","title":"Ratverse X","creator":"Ratverse","banner":"images\/ratverse-x-banner.webp","marketplace":"vesea","nftAddress":"0x4786bFD13641507B4Cd8b492C362C13BCf35Ee71"},
  {"id":79,"name":"stardust_spectres","title":"Stardust Spectres","creator":"Stardust Spectres","banner":"images\/stardust-spectres-banner.webp","marketplace":"vesea","nftAddress":"0x8D831724414739846045E7BC07522058Ff5F67d8"},
  {"id":80,"name":"universal_inventory","title":"Universal Inventory","creator":"Universal Inventory","banner":"images\/universal-inventory-banner.webp","marketplace":"vesea","nftAddress":"0xbcbf39013da096c97f0dc913f7ac1cdc42b9a721"},
  {"id":81,"name":"smuzzies","title":"Smuzzies","creator":"Smuzzies","banner":"images\/smuzzies-banner.webp","marketplace":"vesea","nftAddress":"0x319f08fd7c97fe0010b1f6171debc8dce3738a0e"},
  {"id":82,"name":"gangster_gorillaz","title":"Gangster Gorillaz","creator":"Gangster Gorillaz","banner":"images\/gangster-gorillaz-banner.webp","marketplace":"blackvemarket","nftAddress":"0xa5e2ee50cb49ea4d0a3a520c15aa4cffaf5ea026"},
  {"id":83,"name":"vekongs_2","title":"VeKongs 2.0","creator":"VeKongs","banner":"images\/vekongs-2-banner.webp","marketplace":"vesea","nftAddress":"0x3b9521745ae47418c3c636ec1e76f135cdc961fc"},
  {"id":84,"name":"dos_elements","title":"DoS Elements","creator":"DoS","banner":"images\/elements-banner.webp","marketplace":"blackvemarket","nftAddress":"0x6a4fc1661e9d4ca8814be52d155e2f6353b2782a"},
  {"id":85,"name":"mad_vapes_fusion_g2","title":"Mad V-Apes Fusion G2","creator":"Mad V-Apes","banner":"images\/mad-vapes-fusion-g2-banner.webp","marketplace":"vesea","nftAddress":"0x9c872e8420EC38f404402Bea8F8F86D5d2C17782"},
  {"id":86,"name":"funky_salamanders","title":"Funky Salamanders","creator":"Funky Salamanders","banner":"images\/funky-salamanders-banner.webp","marketplace":"vesea","nftAddress":"0x56b57CC14E10Aae2769A9FB660D0d0c0d41A6acA"},
  {"id":87,"name":"shreddiez","title":"Shreddiez","creator":"Shreddiez","banner":"images\/shreddiez-banner.webp","marketplace":"vesea","nftAddress":"0x428F6E43Adc7649FE79f3a4341f0780cab059FfB"},
  {"id":88,"name":"mad_vapes_land_plots","title":"Mad \u24cb-Apes - Land Plots","creator":"Mad V Apes","banner":"images\/mad-vapes-land-plots-banner.webp","marketplace":"vesea","nftAddress":"0x55cE12bB1af513c44F2135ca0B52f1eeC27203dE"},
  {"id":89,"name":"new_pigs_order_sows","title":"New Pigs Order - Sows","creator":"New Pigs Order","banner":"images\/new-pigs-order-sows-banner.webp","marketplace":"vesea","nftAddress":"0x4ACACFEAAabA51c488D429106184591856356B52"},
  {"id":91,"name":"dos_tamed_teens","title":"DoS Tamed Teens","creator":"DoS","banner":"images\/dos-tamed-teens-banner.webp","marketplace":"blackvemarket","nftAddress":"0x90dc145867F10EC90D4f4432431896Ca8f8Be0e3"},
  {"id":92,"name":"dos_wild_teens","title":"DoS Wild Teens","creator":"DoS","banner":"images\/dos-wild-teens-banner.webp","marketplace":"blackvemarket","nftAddress":"0xBb74D3D8305f6a6B49448746DE7F1c9EffaF0f82"},
  {"id":93,"name":"dos_weapons","title":"DoS Weapons","creator":"DoS","banner":"images\/dos-weapons-banner.webp","marketplace":"blackvemarket","nftAddress":"0xd4310196a56c5193811aE418B8729D82b34ABDCc"},
  {"id":95,"name":"psycho_beasts_nemesis","title":"Psycho Beasts Nemesis","creator":"Psycho Beasts Nemesis","banner":"images\/psycho-beasts-nemesis-banner.webp","marketplace":"vesea","nftAddress":"0x09985F776aE2c175106D8Febf5360F6B380DB582"},
  {"id":96,"name":"shark_gang","title":"Shark Gang","creator":"Shark Gang","banner":"images\/shark-gang-banner.webp","marketplace":"vesea","nftAddress":"0xE4538DDaaF68137a98448552C87f6910F1E3470d"},
  {"id":97,"name":"kickback_koalas_3d","title":"Kickback Koalas 3D","creator":"KBK","banner":"images\/kickback-koalas-3d-banner.webp","marketplace":"vesea","nftAddress":"0x13e13A662bf2A085bbaB01F9B1f5c3319f434Ed2"},
  {"id":98,"name":"vecowboys","title":"VeCowboys","creator":"VeCowboys","banner":"images\/vecowboys-banner.webp","marketplace":"vesea","nftAddress":"0xcB99479e30136D86F9D8a8E9A79a4EcC75e36066"},
  {"id":99,"name":"the_gods_of_olympus","title":"The Gods of Olympus","creator":"LLAMA Studios","banner":"images\/the-gods-of-olympus-banner.webp","marketplace":"vesea","nftAddress":"0x0b6F1e2220E7498111Db0e56D972F93Dd035Da32"},
  {"id":100,"name":"inka_empire_the_conquest","title":"Inka Empire - The Conquest","creator":"LLAMA Studios","banner":"images\/inka-empire-the-conquest-banner.webp","marketplace":"vesea","nftAddress":"0x9d3837c3188f58ed579F98cfE922dcCEf25D6e95"},
  {"id":101,"name":"3dables","title":"3DAbles","creator":"3DAbles","banner":"images\/3dables-banner.webp","marketplace":"vesea","nftAddress":"0xBdF2b45bd428BBA31C46B8D8d1F50615Ee0e1416"},
  {"id":102,"name":"kodama_klub","title":"Kodama Klub","creator":"Kodama Klub","banner":"images\/kodama-klub-banner.webp","marketplace":"vesea","nftAddress":"0x7DE983348E6b4BF215A08e4f21Ddfe75A39eC9dc"},
  {"id":103,"name":"goatz_club","title":"Goatz Club","creator":"Goatz Club","banner":"images\/goatz-club-banner.webp","marketplace":"vesea","nftAddress":"0x4d4664aed6f645fb3defbbd668b2a4842c029187"},
  {"id":104,"name":"mino_mob_multiverse","title":"Mino Mob Multiverse","creator":"Mino Mob Multiverse","banner":"images\/mino-mob-multiverse-banner.webp","marketplace":"vesea","nftAddress":"0xc766DdD21f14862EF426F15BFb28573FDad8bc51"},
  {"id":105,"name":"stardust_spectres_spectres","title":"Stardust Spectres - Spectres","creator":"Stardust Spectres - Spectres","banner":"images\/stardust-spectres-spectres-banner.webp","marketplace":"vesea","nftAddress":"0x4eb966763294a77be85d1a1a56b7e15f59f45dbe"},
  {"id":106,"name":"doodle_thugs","title":"Doodle Thugs","creator":"Doodle Thugs","banner":"images\/doodle-thugs-banner.webp","marketplace":"blackvemarket","nftAddress":"0xe1cd98a883c88622cbbd39b23d95490cd540891b"},
  {"id":107,"name":"vvardogs_portal_passes","title":"VVAR DOGS - Passes","creator":"VVAR DOGS - Passes","banner":"images\/vvardogs-portal-passes-banner.webp","marketplace":"vesea","nftAddress":"0x7b927025cd0e645c28924e2726ecc7372615df46"},
  {"id":108,"name":"vvardogs_portal_davvgs","title":"VVAR DOGS - Portal Davvgs","creator":"VVAR DOGS - Portal Davvgs","banner":"images\/vvardogs-portal-davvgs-banner.webp","marketplace":"vesea","nftAddress":"0xdea490a03000f44d8df78991b19e90cf864906b4"},
  {"id":109,"name":"veking_raiders","title":"VeKing Raiders","creator":"VeKing Raiders","banner":"images\/veking-raiders-banner.webp","marketplace":"vesea","nftAddress":"0x8c41b27504c2ea059312c55122d07149a3363c31"},
  {"id":110,"name":"zilly_zombies","title":"Zilly Zombies","creator":"Zilly Zombies","banner":"images\/zilly-zombies-banner.webp","marketplace":"vesea","nftAddress":"0xe4be710b7553602a37126bd2bade15df18c957ff"},
  {"id":111,"name":"vfoxes_geckos","title":"VFox Alliance - Geckos","creator":"VFox Alliance - Geckos","banner":"images\/vfoxes-geckos-banner.webp","marketplace":"vesea","nftAddress":"0x7957c7685879f45db2642d5705b72bc9ad2d0899"},
  {"id":112,"name":"goatz_club_supermilk","title":"Goatz Club - SuperMilk","creator":"Goatz Club - SuperMilk","banner":"images\/goatz-club-supermilk-banner.webp","marketplace":"vesea","nftAddress":"0xb3317c785176145603e0f6adfe32d8b2e0300633"},
  {"id":113,"name":"bomber_squad_coins","title":"Bomber Squad Coins","creator":"Bomber Squad Coins","banner":"images\/bomber-squad-coins-banner.webp","marketplace":"vesea","nftAddress":"0x2e53f17aa7dcbd00ec3eb80388f509faf84edafa"}
  ]

const itemBoughtABI = {
  anonymous: false,
  inputs: [
    {
      indexed: true,
      internalType: "address",
      name: "nftAddress",
      type: "address"
    },
    {
      indexed: true,
      internalType: "uint256",
      name: "tokenId",
      type: "uint256"
    },
    {
      indexed: false,
      internalType: "address",
      name: "seller",
      type: "address"
    },
    {
      indexed: true,
      internalType: "address",
      name: "buyer",
      type: "address"
    },
    {
      indexed: false,
      internalType: "uint256",
      name: "price",
      type: "uint256"
    }
  ],
  name: "ItemBought",
  type: "event"
};

const VESEA_ADDRESS = "0xDafCA4A51eA97B3b5F21171A95DAbF540894a55A";

export default function App() {
  const [transfers, setTransfers] = useState([]);
  const [address, setAddress] = useState(
    "0x54ffD60A951ea27A2c88c7077ecFa68837487042"
  );

  async function getHistoryFor(address) {
    try {
      const event = connex.thor.account(VESEA_ADDRESS).event(itemBoughtABI);
      const logs = await event
        .filter([{ }])
        .order("desc")
        .apply(0, 200);
      const transfers = logs.map(({ decoded, meta }) => ({
        ...decoded,
        meta
      }));
      console.log(transfers)
      setTransfers(transfers);
    } catch (err) {
      setTransfers([]);
      console.log(err);
    }
  }

  useEffect(() => {
    getHistoryFor(address);
  }, [address]);

  return (
    <div>
    <Row gutter={[32, 32]}>
      <Col span={24} align="center">
        <h3>Last itemBought Events on VeSea from an address</h3>
        <Input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder="change this"
        />
      </Col>
      <Col span={24}>
        <Table dataSource={transfers} pagination={true}>
          <Table.Column
            title="Time"
            dataIndex={["meta", "blockTimestamp"]}
            render={(ts) => new Date(ts * 1000).toISOString()}
          />
          <Table.Column title="Buyer" dataIndex="buyer" />
          <Table.Column title="Token Id" dataIndex="tokenId" />
          <Table.Column title="NFT Address" dataIndex="nftAddress" />
          <Table.Column title="Price" dataIndex="price" render={(value) => ethers.utils.formatEther(value)} />
        </Table>
      </Col>
    </Row>
    <Footer />
    </div>
  );
}