import os
import platform

def limpar_terminal():
    if platform.system() == 'Windows':
        os.system("cls")  # Limpa o terminal no Windows
    else:
        os.system("clear")  # Limpa o terminal no Mac e Linux