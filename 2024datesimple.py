import tkinter as tk
from tkinter import ttk
from datetime import date, timedelta

def calcular_fecha(anio, mes, dia, operacion, cantidad_dias):
    try:
        fecha_inicial = date(anio, mes, dia)
    except ValueError:
        return "Fecha inválida"

    if operacion == "sumar":
        nueva_fecha = fecha_inicial + timedelta(days=cantidad_dias)
    elif operacion == "restar":
        nueva_fecha = fecha_inicial - timedelta(days=cantidad_dias)
    else:
        return "Operación no válida"

    return nueva_fecha.strftime("%d/%m/%Y")

def obtener_dia_semana(anio, mes, dia):
    try:
        fecha = date(anio, mes, dia)
    except ValueError:
        return "Fecha inválida"

    dias_semana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]
    dia_semana = dias_semana[fecha.weekday()]
    return dia_semana

def calcular():
    try:
        anio = int(entry_anio.get())
        mes = int(entry_mes.get())
        dia = int(entry_dia.get())
        operacion = operacion_var.get()
        cantidad_dias = int(entry_cantidad.get())

        nueva_fecha = calcular_fecha(anio, mes, dia, operacion, cantidad_dias)
        resultado_label.config(text=f"La nueva fecha es: {nueva_fecha}")

        dia_semana_original = obtener_dia_semana(anio, mes, dia)
        dia_semana_original_label.config(text=f"Día de la semana (original): {dia_semana_original}")

        nueva_fecha_obj = date(int(nueva_fecha[6:]), int(nueva_fecha[3:5]), int(nueva_fecha[:2]))
        dia_semana_nueva = obtener_dia_semana(nueva_fecha_obj.year, nueva_fecha_obj.month, nueva_fecha_obj.day)
        dia_semana_nueva_label.config(text=f"Día de la semana (nueva): {dia_semana_nueva}")

    except ValueError:
        resultado_label.config(text="Datos inválidos")

# Crear ventana principal
ventana = tk.Tk()
ventana.title("Calculadora de Fechas")

# Etiquetas y entradas para la fecha inicial
label_anio = ttk.Label(ventana, text="Año:")
label_anio.grid(row=0, column=0)
entry_anio = ttk.Entry(ventana)
entry_anio.grid(row=0, column=1)

label_mes = ttk.Label(ventana, text="Mes:")
label_mes.grid(row=1, column=0)
entry_mes = ttk.Entry(ventana)
entry_mes.grid(row=1, column=1)

label_dia = ttk.Label(ventana, text="Día:")
label_dia.grid(row=2, column=0)
entry_dia = ttk.Entry(ventana)
entry_dia.grid(row=2, column=1)

# Opción para la operación
operacion_label = ttk.Label(ventana, text="Operación:")
operacion_label.grid(row=3, column=0)
operacion_var = tk.StringVar(value="sumar")
operacion_menu = ttk.Combobox(ventana, textvariable=operacion_var, values=["sumar", "restar"])
operacion_menu.grid(row=3, column=1)

# Etiqueta y entrada para la cantidad de días
label_cantidad = ttk.Label(ventana, text="Cantidad de días:")
label_cantidad.grid(row=4, column=0)
entry_cantidad = ttk.Entry(ventana)
entry_cantidad.grid(row=4, column=1)

# Botón para calcular
calcular_button = ttk.Button(ventana, text="Calcular", command=calcular)
calcular_button.grid(row=5, column=0, columnspan=2)

# Etiquetas para mostrar resultados
resultado_label = ttk.Label(ventana, text="")
resultado_label.grid(row=6, column=0, columnspan=2)

dia_semana_original_label = ttk.Label(ventana, text="")
dia_semana_original_label.grid(row=7, column=0, columnspan=2)

dia_semana_nueva_label = ttk.Label(ventana, text="")
dia_semana_nueva_label.grid(row=8, column=0, columnspan=2)

ventana.mainloop()
