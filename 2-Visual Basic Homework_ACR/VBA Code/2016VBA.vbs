Sub stockchanges()

Cells(1, 8).Value = "Sub-Total"
Cells(1, 10).Value = "Ticker"
Cells(1, 11).Value = "Yearly Change"
Cells(1, 12).Value = "Percentage Change"
Cells(1, 13).Value = "Total Stock Volume"
Cells(2, 16).Value = "Greatest % Increase"
Cells(3, 16).Value = "Greatest % Decrease"
Cells(4, 16).Value = "Greatest Total Volume"
Cells(1, 17).Value = "Ticker"
Cells(1, 18).Value = "Value"
Cells(1, 20).Value = "Open Price"
Cells(1, 21).Value = "Close Price"


total_volume = 0
summary_row = 2
Cells(summary_row, 10).Value = Cells(2, 1).Value
Cells(summary_row, 20).Value = Cells(2, 3).Value

    'Sub-Total, Ticker, Open, Close, Total Stock Volume

    For Row = 2 To 797711

    ticker1 = Cells(Row, 1).Value
    ticker2 = Cells(Row + 1, 1).Value
    daily_volume = Cells(Row, 7).Value
    open_price = Cells(Row + 1, 3).Value
    close_price = Cells(Row, 6).Value


        If ticker1 = ticker2 Then
            total_volume = total_volume + daily_volume
            Cells(Row, 8).Value = total_volume

        Else
            total_volume = total_volume + daily_volume
            Cells(Row, 8).Value = total_volume

            Cells(summary_row, 13).Value = total_volume

            Cells(summary_row, 21).Value = close_price

            summary_row = summary_row + 1

            Cells(summary_row, 20).Value = open_price
            Cells(summary_row, 10).Value = ticker2

            total_volume = 0

        End If

    Next Row

    'YEARLY/PERCENTAGE CHANGE
    'yearly change = close minus open
    'percent change = (yearly change/open) *100

    For Row = 2 To 3169

        openprice = Cells(Row, 20).Value
        closeprice = Cells(Row, 21).Value
        yearlychange = closeprice - openprice
        Cells(Row, 11).Value = yearlychange

        if yearlychange <> 0 and openprice <> 0 Then
        percentchange = yearlychange / openprice
        Cells(Row, 12).Value = percentchange

        end If

    Next Row

    'GREATEST INCREASE
    greatest_inc = 0
    inc_ticker = Cells(2, 10).Value

     For Row = 2 To 3169

        current_change = Cells(Row, 12).Value
        next_change = Cells(Row + 1, 12).Value

            If current_change > greatest_inc Then

                greatest_inc = current_change
                inc_ticker = Cells(Row, 10).Value

            ElseIf next_change > greatest_inc Then

                greatest_inc = next_change
                inc_ticker = Cells(Row + 1, 10).Value

            End If

    Next Row

    Cells(2, 17).Value = inc_ticker
    Cells(2, 18).Value = greatest_inc

    'GREATEST DECREASE
    greatest_dec = 0
    dec_ticker = Cells(2, 10).Value

    For Row = 2 To 3169

        current_change = Cells(Row, 12).Value
        next_change = Cells(Row + 1, 12).Value

            If current_change < greatest_dec Then

                greatest_dec = current_change
                dec_ticker = Cells(Row, 10).Value

            ElseIf next_change < greatest_dec Then

                greatest_dec = next_change
                dec_ticker = Cells(Row + 1, 10).Value

            End If

    Next Row

    Cells(3, 17).Value = dec_ticker
    Cells(3, 18).Value = greatest_dec

    'GREATEST VOLUME
    greatest_volume = 0
    vol_ticker = Cells(2, 10).Value

    For Row = 2 To 3169

        current_change = Cells(Row, 13).Value
        next_change = Cells(Row + 1, 13).Value

            If current_change > greatest_volume Then

                greatest_volume = current_change
                vol_ticker = Cells(Row, 10).Value

            ElseIf next_change > greatest_volume Then

                greatest_volume = next_change
                vol_ticker = Cells(Row + 1, 10).Value

            End If

    Next Row

    Cells(4, 17).Value = vol_ticker
    Cells(4, 18).Value = greatest_volume

End Sub