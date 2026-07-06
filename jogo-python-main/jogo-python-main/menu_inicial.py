import random
from outros import limpar_terminal                
import time

ascii_art = """
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀                        ⣀⠤⠿⢤⢖⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀                  
⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀               ⡔⢩⠂⠀⠒⠗⠈⠀⠉⠢⠄⣀⠠⠤⠄⠒⢖⡒⢒⠂⠤⢄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀                ⠇⠤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠈⠀⠈⠈⡨⢀⠡⡪⠢⡀⠀⠀⠀
⠀⠀⠀⢀⣾⣿⣿⣿⣿⠟⠋⠉⠀⢤⡆⠀⠀⣄⠉⠛⠿⣿⣿⣿⣿⣿⡦⠀                ⠈⠒⠀⠤⠤⣄⡆⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠢⠀⢕⠱⠀⠀⠀
⠀⠀⠀⣼⣿⣿⣿⠟⠁⠀⠛⣷⡀⠸⠧⠀⠸⠏⠀⠀⠀⠈⠻⡿⠟⠋⠀⠀                ⠀⠀⠀⠀⠀⠈ ⢳⣐⡐⠐⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠁⠇⠀⠀
⠀⠀⠀⣿⣿⣿⠃⠀⠀⠀⠀⠈⣁⣤⣴⣶⣾⣶⣤⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀               ⠀⠀⠀⠀⠀⠀⠀⠑⢤⢁⠀⠆⠀⠀⠀⠀⠀⢀⢰⠀⠀⠀⡀⢄⡜⠀
⠀⠀⠀⢿⣿⡇⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣷⣴⡀⠀⠀⠀⠀⠀⠀               ⠀⠀⠀⠀⠀⠀⠶⡿⠤⠚⠁⠀⠀⠀⢀⣠⡤⢺⣥⠟⢡⠃⠀⠀⠀
⠀⠀⠀⠸⣿⣧⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣟⣩⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀                ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀      
⠀⠀⠀⠀⢻⣿⣆⠀⠀⠀⢿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡿⠁⠀⠀⢀⣾⣿⠾⣿⣻⣿⣿⣿⡿⢸⣿⠟⢓⠀⠀
⠀⠀⠀⠀⠀⠻⣿⣦⠀⠀⠸⣿⡿⣿⣿⣿⣿⣿⣿⡆⡿⠤⠤⠄
⠀⠀⠀⠀⠀⠀⠘⣿⡇⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣐⣦⡀
⠀⠀⠀⠀⠀⠀⢀⡿⠁⠀⠀⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀
⠀⠀⠀⠀⠀⣠⡞⠁⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀
⠀⠀⠀⢀⠴⠋⠀⠀⠀⠰⠛⠋⠋⠋⠋⠋⠋⠉⠙⠻⢿⣿⠀⠀⠀
"""

ascii_art2 = """⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⣶⡆⠀⣰⣿⠇⣾⡿⠛⠉⠁
⠀⣠⣴⠾⠿⠿⠀⢀⣾⣿⣆⣀⣸⣿⣷⣾⣿⡿⢸⣿⠟⢓⠀⠀
⣴⡟⠁⣀⣠⣤⠀⣼⣿⠾⣿⣻⣿⠃⠙⢫⣿⠃⣿⡿⠟⠛⠁⠀
⢿⣝⣻⣿⡿⠋⠾⠟⠁⠀⠹⠟⠛⠀⠀⠈⠉⠀⠉⠀⠀⠀⠀⠀
⠀⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⣀⢀⣠⣤⣴⣤⣄⠀
⠀⠀⠀⠀⣀⣤⣤⢶⣤⠀⠀⢀⣴⢃⣿⠟⠋⢹⣿⣣⣴⡿⠋⠀
⠀⠀⣰⣾⠟⠉⣿⡜⣿⡆⣴⡿⠁⣼⡿⠛⢃⣾⡿⠋⢻⣇⠀⠀
⠀⠐⣿⡁⢀⣠⣿⡇⢹⣿⡿⠁⢠⣿⠷⠟⠻⠟⠀⠀⠈⠛⠀⠀
⠀⠀⠙⠻⠿⠟⠋⠀⠀⠙⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"""

ascii_art3 = """
░██████╗░░██████╗░
██╔════╝░██╔════╝░
██║░░██╗░██║░░██╗░
██║░░╚██╗██║░░╚██╗
╚██████╔╝╚██████╔╝
░╚═════╝░░╚═════╝░"""

opt = '0'
escolha = '0'

hp_player_nv1 = 100
hp_capivara_nv1 = 100
hp_player_nv2 = 200
hp_capivara_nv2 = 200

rodar_jogo = True

while rodar_jogo:
    print('-' * 20)
    print()
    print('BEM VINDO AO JOGO HUMANO X CAPIVARA')
    print()
    print('MENU INTERATIVO')
    print()
    print('[ 1 ] - Iniciar o Jogo')
    print('[ 2 ] - Sair do jogo')
    print()
    print('-' * 20)

    opt = input("Escolha uma opção: ")
    if opt == '1':
        print('\nPrepare-se, a partida irá começar!')
        for i in range(1, 4):
            time.sleep(1)
            print(i)
        limpar_terminal.limpar_terminal()
        
        while hp_player_nv1 > 0 and hp_capivara_nv1 > 0:
            soco = random.randrange(10, 15)
            cabecada = random.randrange(5, 10)
            golpe_jiu_jitsu = random.randrange(10, 20)
            golpe_arranhao = random.randrange(10, 15)
            golpe_morder = random.randrange(8, 13)

            print('\nQual ataque você quer usar')
            print('\n[ 1 ] - SOCO PODEROSO')
            print('[ 2 ] - CABEÇADA')
            print('[ 3 ] - GOLPE JIU JITSU')
            escolha = input('\nSelecione um ataque: ')
            
            limpar_terminal.limpar_terminal()
            
            if escolha == '1':
                hp_capivara_nv1 -= soco
                print(f'\nVocê atacou com o SOCO e a vida da capivara foi para {hp_capivara_nv1}!')

            elif escolha == '2':
                hp_capivara_nv1 -= cabecada
                print(f'\nVocê atacou com a CABEÇADA e a vida da capivara foi para {hp_capivara_nv1}')

            elif escolha == '3':
                hp_capivara_nv1 -= golpe_jiu_jitsu
                print(f'\nVocê atacou com o GOLPE DE JIU JITSU e a vida da capivara foi para {hp_capivara_nv1}')

            else:
                print('Opção Inválida, voce será punido e perdera vez')

            if hp_capivara_nv1 <= 0:
                limpar_terminal.limpar_terminal()
                print("\ncapivara foi de beise, nível 1 concluido!")            

            print('\nA capivara irá contra atacar')
            ataque_inimigo = random.randint(0, 1)            
            if ataque_inimigo == 1:
                print('\nOOOOOOOOHHH NÃO')
                print('A capivara lhe arranhou!')
                hp_player_nv1 -= golpe_arranhao
            else:
                print('\nOOOOOOOOHHH NÃO')
                print('A Capivara lhe mordeu')
                hp_player_nv1 -= golpe_morder
                
            print('Sua vida agora é de ', hp_player_nv1)
            print(ascii_art)
            print(f"\n---------- {hp_player_nv1} -------------                 -------------- {hp_capivara_nv1} --------------")

        if hp_player_nv1 > 0:
            print(ascii_art3)
            print('\nParabéns, você venceu')
            print('\nBEM VINDO AO NIVEL 2')
            for i in range(1, 4):
                time.sleep(1)
                print(i)
            print('\nNOVAS HABILIDADES DESBLOQUEADAS')
            while hp_player_nv2 > 0 and hp_capivara_nv2 > 0:
                soco_poderoso = random.randrange(15, 25)
                cabecada_sang = random.randrange(15, 20)
                golpe_popo = random.randrange(25, 30)
                golpe_afogamento = random.randrange(20, 30)
                golpe_cabecada = random.randrange(22, 30)

                print('\nQual ataque você quer usar')
                print('\n[ 1 ] - SOCO PODEROSO ALADO')
                print('[ 2 ] - CABEÇADA SANGRENTA')
                print('[ 3 ] - GOLPE BOXE DO POPÓ')
                escolha = input('\nSelecione um ataque: ')

                limpar_terminal.limpar_terminal()

                if escolha == '1':
                    hp_capivara_nv2 -= soco_poderoso
                    print(f'\nVocê atacou com o SOCO e a vida da capivara foi para {hp_capivara_nv2}!')
                elif escolha == '2':
                    hp_capivara_nv2 -= cabecada_sang
                    print(f'\nVocê atacou com a CABEÇADA e a vida da capivara foi para {hp_capivara_nv2}')
                elif escolha == '3':
                    hp_capivara_nv2 -= golpe_popo
                    print(f'\nVocê atacou com o GOLPE DE JIU JITSU e a vida da capivara foi para {hp_capivara_nv2}')
                else:
                    print('Opção Inválida, voce será punido e perdera vez')
                                
                if hp_capivara_nv2 <= 0:
                    limpar_terminal.limpar_terminal()
                    print("\nCapivara foi de beise, nível 2 concluído, PARABÉNS, VOCÊ VENCEU O JOGO!")
                    print(ascii_art3)
                    rodar_jogo = False
                    break
                                
                print('\nA capivara irá contra atacar')
                ataque_inimigo = random.randint(0, 1)            
                if ataque_inimigo == 1:
                    print('\nOOOOOOOOHHH NÃO')
                    print('A capivara tentou lhe afogar e deu muito dano!')
                    hp_player_nv2 -= golpe_afogamento
                else:
                    print('\nOOOOOOOOHHH NÃO')
                    print('A Capivara lhe deu uma super Cabeçada!')
                    hp_player_nv2 -= golpe_cabecada
                            
                print('Sua vida agora é de ', hp_player_nv2)
                print(ascii_art)
                print(f"\n---------- {hp_player_nv2} -------------                 -------------- {hp_capivara_nv2} --------------")

            else:
                print(ascii_art2)
                print('\nA capivara venceu')
                break
        else:
            print(ascii_art2)
            print('\nA capivara venceu')
            break

    elif opt == '2':
        print('QUE PENA QUE VOCÊ SAIU, ATÉ A PRÓXIMA')
        break
    else:
        print("Opção inválida. Por favor, escolha novamente.")